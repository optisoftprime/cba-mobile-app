import { useState, useEffect, useRef } from 'react';
import Toast from 'react-native-toast-message';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { validateAccountNumber, makeInternalTransfer } from 'api/transfer';
import { getDashBoardData } from 'api/home';
import { formatWithCommas, getUniqueRecipients, stripCommas } from 'helper';
import { navigateReplace } from 'app/navigate';
import { useQueryClient } from '@tanstack/react-query'; // or 'react-query'


export function useWalletTransfer() {
    const [walletNumber, setWalletNumber] = useState('');
    const [validatedAccount, setValidatedAccount] = useState(null);
    const [validating, setValidating] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const queryClient = useQueryClient();

    const [amount, setAmount] = useState('');
    const [narration, setNarration] = useState('');

    const [pinModalVisible, setPinModalVisible] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const debounceRef = useRef(null);

    const { data: dashData } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await getDashBoardData();
            return (
                response?.data?.data ?? {
                    walletBalance: 0,
                    accountNumber: '',
                    accountName: '',
                    transactionHistory: [],
                }
            );
        },
        staleTime: 5 * 60 * 1000,
    });

    const allRecipients = getUniqueRecipients(dashData?.transactionHistory ?? []);

    const suggestions =
        walletNumber.trim().length === 0
            ? allRecipients.slice(0, 8)
            : allRecipients
                .filter(
                    (r) =>
                        r.accountNumber?.includes(walletNumber) ||
                        r.customerName?.toLowerCase().includes(walletNumber.toLowerCase())
                )
                .slice(0, 8);

    // ── Validation ──────────────────────────────────────────────────────────

    const runValidation = async (accountNumber) => {
        setValidating(true);
        try {
            const response = await validateAccountNumber({ accountNumber });
            if (response?.ok && response?.data?.data) {
                setValidatedAccount(response.data.data);
            } else {
                setValidationError(response?.message ?? 'Account not found');
            }
        } catch (error) {
            setValidationError(error?.message ?? 'Validation failed');
        } finally {
            setValidating(false);
        }
    };

    const handleWalletNumberChange = (text) => {
        const digits = text.replace(/[^0-9]/g, '');
        setWalletNumber(digits);
        setValidatedAccount(null);
        setValidationError('');
        setShowSuggestions(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (digits.length === 10) {
            debounceRef.current = setTimeout(() => {
                setShowSuggestions(false);
                runValidation(digits);
            }, 500);
        }
    };

    const handleSelectSuggestion = (tx) => {
        setWalletNumber(tx.accountNumber);
        setShowSuggestions(false);
        setValidatedAccount(null);
        setValidationError('');

        if (debounceRef.current) clearTimeout(debounceRef.current);
        runValidation(tx.accountNumber);
    };

    const handleAmountChange = (text) => setAmount(formatWithCommas(text));

    // ── Actions ─────────────────────────────────────────────────────────────

    const handleContinue = () => {
        if (!validatedAccount) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Recipient',
                text2: 'Please enter a valid wallet number.',
            });
            return;
        }
        if (!amount) {
            Toast.show({
                type: 'error',
                text1: 'Missing Amount',
                text2: 'Please enter an amount to transfer.',
            });
            return;
        }
        setPinModalVisible(true);
    };

    const handlePinConfirm = async (pin) => {
        setSubmitting(true);
        try {
            const response = await makeInternalTransfer(
                {},
                {
                    destinationAccountNumber: walletNumber,
                    amount: parseFloat(stripCommas(amount)),
                    description: narration,
                    transactionPin: pin,
                }
            );
            if (response?.ok) {
                setPinModalVisible(false);
                Toast.show({
                    type: 'success',
                    text1: 'Transfer Successful',
                    text2: response?.message ?? 'Your transfer was completed.',
                });
                await queryClient.invalidateQueries({ queryKey: ['dashboard'] });


                navigateReplace('transactionReceipt');
            } else {
                Toast.show({ type: 'error', text1: 'Transfer Failed', text2: response?.message });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'An error occurred', text2: error?.message });
        } finally {
            setSubmitting(false);
        }
    };

    // ── Cleanup ──────────────────────────────────────────────────────────────

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return {
        // field values
        walletNumber,
        amount,
        narration,
        setNarration,
        // validation state
        validatedAccount,
        validating,
        validationError,
        // suggestions
        suggestions,
        showSuggestions,
        setShowSuggestions,
        // modal state
        pinModalVisible,
        setPinModalVisible,
        submitting,
        // handlers
        handleWalletNumberChange,
        handleSelectSuggestion,
        handleAmountChange,
        handleContinue,
        handlePinConfirm,
    };
}