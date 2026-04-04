// screens/WalletToWalletTransfer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import TextInputComponent from 'components/textInputs';
import EnterPINModal from 'components/EnterPINModal';
import { validateAccountNumber, makeInternalTransfer } from 'api/transfer';
import { Colors } from 'config/theme';

const formatWithCommas = (value) => {
  const digits = value.replace(/[^0-9.]/g, '');
  const parts = digits.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

const stripCommas = (value) => value.replace(/,/g, '');

export default function WalletToWalletTransfer() {
  const [walletNumber, setWalletNumber] = useState('');
  const [validatedAccount, setValidatedAccount] = useState(null);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');

  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const debounceRef = useRef(null);

  const handleWalletNumberChange = (text) => {
    const digits = text.replace(/[^0-9]/g, '');
    setWalletNumber(digits);
    setValidatedAccount(null);
    setValidationError('');

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (digits.length === 10) {
      debounceRef.current = setTimeout(async () => {
        setValidating(true);
        try {
          const response = await validateAccountNumber({ accountNumber: digits });
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
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

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
          text2: response?.data?.message ?? 'Your transfer was completed.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Transfer Failed',
          text2: response?.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: error?.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Wallet to Wallet"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          <TextInputComponent
            label="Recipient Wallet Number"
            value={walletNumber}
            onChangeText={handleWalletNumberChange}
            placeholder="Enter 10-digit wallet number"
            keyboardType="number-pad"
            maxLength={10}
            isLoading={validating}
            containerStyle={{ marginBottom: 8 }}
          />

          {/* Validated account card */}
          {validatedAccount && (
            <View
              className="mb-5 flex-row items-center rounded-xl px-4 py-3"
              style={{ backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' }}>
              <View
                className="mr-3 h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: '#DCFCE7' }}>
                <Ionicons name="checkmark" size={18} color="#16A34A" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-green-600">Account verified</Text>
                <Text className="text-sm font-bold text-green-800">
                  {validatedAccount.accountName}
                </Text>
                <Text className="text-xs text-green-600">{validatedAccount.accountNumber}</Text>
              </View>
            </View>
          )}

          {/* Validation error card */}
          {validationError ? (
            <View
              className="mb-5 flex-row items-center rounded-xl px-4 py-3"
              style={{ backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' }}>
              <View
                className="mr-3 h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: '#FEE2E2' }}>
                <Ionicons name="close" size={18} color="#DC2626" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-red-500">Verification failed</Text>
                <Text className="text-sm font-semibold text-red-700">{validationError}</Text>
              </View>
            </View>
          ) : null}

          <TextInputComponent
            label="Amount"
            value={amount}
            onChangeText={(text) => setAmount(formatWithCommas(text))}
            placeholder="₦0.00"
            keyboardType="decimal-pad"
            containerStyle={{ marginBottom: 16 }}
          />

          <TextInputComponent
            label="Narration"
            value={narration}
            onChangeText={setNarration}
            placeholder="Enter narration"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{ minHeight: 100 }}
            containerStyle={{ marginBottom: 24 }}
          />
        </View>

        <View className="px-4 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>

      <EnterPINModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onConfirm={handlePinConfirm}
        isLoading={submitting}
        title="Enter PIN"
        subtitle="Enter your 4-digit transaction PIN"
      />
    </View>
  );
}
