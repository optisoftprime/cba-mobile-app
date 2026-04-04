// screens/LoanApplicationForm.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import Header from 'components/header';
import { navigateBack, navigateReplace } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import { bookLoan, fetchAllLoanProducts } from 'api/loans';

const formatWithCommas = (value) => {
  const digits = value.replace(/[^0-9.]/g, '');
  const parts = digits.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
};

const stripCommas = (value) => value.replace(/,/g, '');

export default function LoanApplicationForm() {
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
      if (response?.ok && response?.data?.data) {
        return response.data.data;
      }
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

  const getDurationOptions = () => {
    if (!selectedProduct) return [];
    const { minLoanDuration, maxLoanDuration } = selectedProduct;
    if (minLoanDuration == null || maxLoanDuration == null) return [];
    const options = [];
    for (let i = minLoanDuration; i <= maxLoanDuration; i++) {
      const unit =
        selectedProduct.loanTenure === 'Daily'
          ? i === 1
            ? 'day'
            : 'days'
          : selectedProduct.loanTenure === 'Weekly'
            ? i === 1
              ? 'week'
              : 'weeks'
            : i === 1
              ? 'month'
              : 'months';
      options.push({ label: `${i} ${unit}`, value: String(i) });
    }
    return options;
  };

  const calculateTotalPayable = () => {
    if (!loanAmount || !repaymentDuration || !selectedProduct) return '₦0.00';
    const amount = parseFloat(stripCommas(loanAmount));
    const duration = parseInt(repaymentDuration);
    const rate = selectedProduct.interestRate / 100;
    const total = amount + amount * rate * duration;
    return `₦${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleLoanAmountChange = (text) => {
    setLoanAmount(formatWithCommas(text));
  };

  const handleProductSelect = (value) => {
    const product = loanProducts.find((p) => String(p.id) === value);
    setSelectedProduct(product || null);
    setRepaymentDuration('');
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
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
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
      setBookingLoan(false);
    }
  };

  const productOptions = loanProducts.map((p) => ({
    label: p.name,
    value: String(p.id),
  }));

  const durationOptions = getDurationOptions();

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

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors?.primary]}
            tintColor={Colors?.primary}
          />
        }>
        <Header
          title="Loan Application Form"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Loan Wallet"
          balance="₦0.00"
          description={
            selectedProduct ? `${selectedProduct.interestRate}% Interest Rate` : '5% Interest Rate'
          }
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#4C1D95"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={false}
          containerClassName="mx-5 mb-8"
        />

        <View className="flex-1 px-5">
          <Dropdown
            label="Loan Product"
            placeholder={loadingProducts ? 'Loading...' : 'Select a loan product'}
            value={selectedProduct ? String(selectedProduct.id) : ''}
            options={loadingProducts ? [] : productOptions}
            onSelect={handleProductSelect}
            isOpen={showProductDropdown && !isBusy}
            onToggle={() => {
              if (isBusy) return;
              setShowProductDropdown(!showProductDropdown);
            }}
            isLoading={isBusy}
            search
          />

          {selectedProduct && (
            <View className="mb-4 rounded-lg bg-purple-50 p-3">
              <Text className="text-xs font-medium text-purple-700">
                Min: ₦{selectedProduct.minimumLoanAmount?.toLocaleString()} · Max: ₦
                {selectedProduct.maximumLoanAmount?.toLocaleString()} · Rate:{' '}
                {selectedProduct.interestRate}% · {selectedProduct.interestType?.replace(/_/g, ' ')}
              </Text>
            </View>
          )}

          <TextInputComponent
            label="Loan Amount"
            value={loanAmount}
            onChangeText={handleLoanAmountChange}
            placeholder="₦0.00"
            keyboardType="decimal-pad"
            error={loanAmountError}
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16 }}
          />

          <TextInputComponent
            label="Loan Purpose"
            value={loanPurpose}
            onChangeText={setLoanPurpose}
            placeholder="e.g. Business expansion"
            returnKeyType="done"
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16 }}
          />

          <Dropdown
            label="Repayment Duration"
            placeholder={selectedProduct ? 'Select duration' : 'Select a product first'}
            value={repaymentDuration}
            options={durationOptions}
            onSelect={(value) => setRepaymentDuration(value)}
            isOpen={showDurationDropdown && !isBusy}
            onToggle={() => {
              if (isBusy) return;
              if (!selectedProduct) {
                Toast.show({
                  type: 'error',
                  text1: 'Select a loan product',
                  text2: 'Please choose a loan product first to see duration options.',
                });
                return;
              }
              setShowDurationDropdown(!showDurationDropdown);
            }}
            isLoading={isBusy}
          />

          <TextInputComponent
            label="Interest Rate"
            value={selectedProduct ? `${selectedProduct.interestRate}%` : '—'}
            editable={false}
            isLoading={isBusy}
            inputStyle={{ backgroundColor: '#F3F4F6' }}
            containerStyle={{ marginBottom: 16 }}
          />

          {productFees.length > 0 && (
            <View className="mb-6 rounded-lg bg-blue-50 p-4">
              <Text className="mb-3 font-semibold text-gray-900">Fees</Text>
              {productFees.map((fee) => (
                <View key={fee.label} className="mb-1 flex-row items-center justify-between">
                  <Text className="text-sm text-gray-700">• {fee.label}</Text>
                  <Text className="text-sm font-medium text-gray-900">{fee.value}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            onPress={() => {
              if (isBusy) return;
              setUnderstood(!understood);
            }}
            activeOpacity={isBusy ? 1 : 0.7}
            className="mb-6 flex-row items-center">
            <View
              className="h-5 w-5 items-center justify-center rounded border-2"
              style={{
                borderColor: isBusy ? '#9CA3AF' : understood ? Colors?.primary : 'black',
                backgroundColor: isBusy ? '#F3F4F6' : understood ? Colors?.primary : 'transparent',
              }}>
              {understood && !isBusy && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text className="ml-3 flex-1 text-sm" style={{ color: isBusy ? '#9CA3AF' : '#111827' }}>
              I understand, I can't withdraw early
            </Text>
          </TouchableOpacity>

          <TextInputComponent
            label="Total Loan Payable"
            value={calculateTotalPayable()}
            editable={false}
            isLoading={isBusy}
            inputStyle={{ backgroundColor: '#F3F4F6' }}
            containerStyle={{ marginBottom: 32 }}
          />
        </View>

        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleBookLoan}
            label="Continue"
            isLoading={bookingLoan}
            loadingText="Booking..."
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
