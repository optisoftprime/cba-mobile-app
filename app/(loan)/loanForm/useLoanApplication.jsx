import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import { bookLoan, fetchAllLoanProducts } from 'api/loans';
import { navigateReplace } from 'app/navigate';
import { formatWithCommas, stripCommas } from 'helper';

const getDurationUnit = (tenure, count) => {
    if (tenure === 'Daily') return count === 1 ? 'day' : 'days';
    if (tenure === 'Weekly') return count === 1 ? 'week' : 'weeks';
    return count === 1 ? 'month' : 'months';
};

export function useLoanApplication() {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const [repaymentDuration, setRepaymentDuration] = useState('');
    const [understood, setUnderstood] = useState(false);

    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [bookingLoan, setBookingLoan] = useState(false);

    const {
        data: loanProducts = [],
        isLoading: loadingProducts,
        isRefetching,
        refetch,
    } = useQuery({
        queryKey: ['loanProducts'],
        queryFn: async () => {
            const response = await fetchAllLoanProducts();
            if (response?.ok && response?.data?.data) return response.data.data;
            Toast.show({
                type: 'error',
                text1: 'Failed To Fetch Products',
                text2: response?.message,
            });
            return [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const isBusy = loadingProducts || bookingLoan;

    // ── Derived data ─────────────────────────────────────────────────────────

    const productOptions = loanProducts.map((p) => ({ label: p.name, value: String(p.id) }));

    const durationOptions = (() => {
        if (!selectedProduct) return [];
        const { minLoanDuration, maxLoanDuration, loanTenure } = selectedProduct;
        if (minLoanDuration == null || maxLoanDuration == null) return [];
        const options = [];
        for (let i = minLoanDuration; i <= maxLoanDuration; i++) {
            options.push({ label: `${i} ${getDurationUnit(loanTenure, i)}`, value: String(i) });
        }
        return options;
    })();

    const productFees = selectedProduct
        ? [
            selectedProduct.processingFee > 0 && {
                label: 'Processing Fee',
                value: `${selectedProduct.processingFee}%`,
            },
            selectedProduct.lateRepaymentPenalty > 0 && {
                label: 'Late Repayment Penalty',
                value: `${selectedProduct.lateRepaymentPenalty}%`,
            },
            selectedProduct.gracePeriod > 0 && {
                label: 'Grace Period',
                value: `${selectedProduct.gracePeriod} days`,
            },
        ].filter(Boolean)
        : [];

    const loanAmountError = (() => {
        if (!selectedProduct || !loanAmount) return '';
        const amount = parseFloat(stripCommas(loanAmount));
        if (amount < selectedProduct.minimumLoanAmount)
            return `Minimum loan amount is ₦${selectedProduct.minimumLoanAmount?.toLocaleString()}`;
        if (amount > selectedProduct.maximumLoanAmount)
            return `Maximum loan amount is ₦${selectedProduct.maximumLoanAmount?.toLocaleString()}`;
        return '';
    })();

    const totalPayable = (() => {
        if (!loanAmount || !repaymentDuration || !selectedProduct) return '₦0.00';
        const amount = parseFloat(stripCommas(loanAmount));
        const duration = parseInt(repaymentDuration);
        const rate = selectedProduct.interestRate / 100;
        const total = amount + amount * rate * duration;
        return `₦${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    })();

    // ── Handlers ─────────────────────────────────────────────────────────────

    const handleLoanAmountChange = (text) => setLoanAmount(formatWithCommas(text));

    const handleProductSelect = (value) => {
        const product = loanProducts.find((p) => String(p.id) === value);
        setSelectedProduct(product || null);
        setRepaymentDuration('');
    };

    const handleToggleDurationDropdown = () => {
        if (isBusy) return;
        if (!selectedProduct) {
            Toast.show({
                type: 'error',
                text1: 'Select a loan product',
                text2: 'Please choose a loan product first to see duration options.',
            });
            return;
        }
        setShowDurationDropdown((prev) => !prev);
    };

    const handleToggleProductDropdown = () => {
        if (isBusy) return;
        setShowProductDropdown((prev) => !prev);
    };

    const handleToggleUnderstood = () => {
        if (isBusy) return;
        setUnderstood((prev) => !prev);
    };

    const handleBookLoan = async () => {
        if (!selectedProduct || !loanAmount || !loanPurpose || !repaymentDuration) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill in all required fields before continuing.',
            });
            return;
        }

        const payload = {
            loanProductId: selectedProduct.id,
            duration: parseInt(repaymentDuration),
            loanPurpose,
            amount: parseFloat(stripCommas(loanAmount)),
            tenureType: selectedProduct.loanTenure,
            repaymentFrequency: selectedProduct.repaymentFrequency,
        };

        setBookingLoan(true);
        try {
            const response = await bookLoan(payload);
            if (response?.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Loan Booked',
                    text2: response?.message ?? 'Your loan application was submitted successfully.',
                });
                navigateReplace('loans');
            } else {
                Toast.show({ type: 'error', text1: 'An error occurred', text2: response?.message });
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: 'An error occurred', text2: error?.message });
        } finally {
            setBookingLoan(false);
        }
    };

    return {
        // field values
        loanAmount,
        loanPurpose,
        setLoanPurpose,
        repaymentDuration,
        setRepaymentDuration,
        understood,
        // dropdown visibility
        showDurationDropdown,
        showProductDropdown,
        // product state
        selectedProduct,
        loanProducts,
        loadingProducts,
        bookingLoan,
        isBusy,
        isRefetching,
        refetch,
        // derived
        productOptions,
        durationOptions,
        productFees,
        loanAmountError,
        totalPayable,
        // handlers
        handleLoanAmountChange,
        handleProductSelect,
        handleToggleDurationDropdown,
        handleToggleProductDropdown,
        handleToggleUnderstood,
        handleBookLoan,
    };
}