// screens/LoanApplicationForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';

export default function LoanApplicationForm() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [repaymentDuration, setRepaymentDuration] = useState('');
  const [interestRate] = useState('5%');
  const [understood, setUnderstood] = useState(false);

  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);

  const purposeOptions = [
    { label: 'Business', value: 'business' },
    { label: 'Personal', value: 'personal' },
    { label: 'Education', value: 'education' },
    { label: 'Medical', value: 'medical' },
  ];

  const durationOptions = [
    { label: '6 month', value: '6' },
    { label: '12 month', value: '12' },
    { label: '18 month', value: '18' },
    { label: '24 month', value: '24' },
  ];

  const calculateTotalPayable = () => {
    if (!loanAmount || !repaymentDuration) return '₦0.00';
    const amount = parseFloat(loanAmount.replace(/,/g, ''));
    const months = parseInt(repaymentDuration);
    const rate = 0.05; // 5% interest rate
    const total = amount + amount * rate * months;
    return `₦${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleContinue = () => {
    console.log('Loan Application Form Submitted:', {
      loanAmount,
      loanPurpose,
      repaymentDuration,
      interestRate,
      understood,
    });
    navigateTo('loans');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Loan Application Form"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Loan Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
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

        {/* Form Content */}
        <View className="flex-1 px-5">
          {/* Loan Amount Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Loan Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={loanAmount}
              onChangeText={setLoanAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Loan Purpose Dropdown */}
          <Dropdown
            label="Loan Purpose"
            placeholder="Business"
            value={loanPurpose}
            options={purposeOptions}
            onSelect={(value) => {
              setLoanPurpose(value);
              setShowPurposeDropdown(false);
            }}
            isOpen={showPurposeDropdown}
            onToggle={() => setShowPurposeDropdown(!showPurposeDropdown)}
          />

          {/* Repayment Duration Dropdown */}
          <Dropdown
            label="Repayment Duration"
            placeholder="6 month"
            value={repaymentDuration}
            options={durationOptions}
            onSelect={(value) => {
              setRepaymentDuration(value);
              setShowDurationDropdown(false);
            }}
            isOpen={showDurationDropdown}
            onToggle={() => setShowDurationDropdown(!showDurationDropdown)}
          />

          {/* Interest Rate */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Interest Rate</Text>
            <View className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">{interestRate}</Text>
            </View>
          </View>

          {/* Fees Section */}
          <View className="mb-6 rounded-lg bg-blue-100 p-4">
            <Text className="mb-3 font-semibold text-gray-900">Fees</Text>
            <Text className="mb-1 text-sm text-gray-700">• Management - Fee 0.5%</Text>
            <Text className="mb-1 text-sm text-gray-700">• Admin Fee - 1.5%</Text>
            <Text className="mb-1 text-sm text-gray-700">• Insurance Fee - 1.5%</Text>
            <Text className="text-sm text-gray-700">• Credit Bureau - 1.5%</Text>
          </View>

          {/* Checkbox */}
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity
              onPress={() => setUnderstood(!understood)}
              className="h-5 w-5 items-center justify-center rounded border-2"
              style={{
                borderColor: understood ? Colors?.primary : "black",
                backgroundColor: understood ? Colors?.primary : 'transparent',
              }}>
              {understood && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>

            <Text className="ml-3 text-sm">I understand, I can't withdraw early</Text>
          </View>

          {/* Total Loan Payable */}
          <View className="mb-8">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Total Loan Payable</Text>
            <View className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">
                {calculateTotalPayable()}
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold "
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
