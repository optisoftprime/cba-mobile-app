// screens/CollateralLoanForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';
import Dropdown from 'components/dropDown';

export default function CollateralLoanForm() {
  const [contributionAmount, setContributionAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');

  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const frequencyOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const sourceOptions = [
    { label: 'Main Wallet', value: 'main_wallet' },
    { label: 'Bank Account', value: 'bank_account' },
    { label: 'Card', value: 'card' },
  ];

  const handleContinue = () => {
    console.log('Form submitted:', {
      contributionAmount,
      frequency,
      sourceOfFunds,
    });
    navigateTo('collateralLoanSavings');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Collateral Loan Savings"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        {/* Wallet Card */}
        <View >
          <WalletCard
            walletName="Collateral Savings Wallet"
            balance="₦0.00"
            description="5% Interest Rate"
            backgroundImagePath={require('../../../assets/Vector .png')}
            color="#A0522D"
          />
        </View>

        <View className="flex-1 px-5 pt-6">
          {/* Contribution Amount */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Contribution Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={contributionAmount}
              onChangeText={setContributionAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Frequency Dropdown */}
          <Dropdown
            label="Frequency"
            placeholder="Select lock reason"
            value={frequency}
            options={frequencyOptions}
            onSelect={(value) => {
              setFrequency(value);
              setShowFrequencyDropdown(false);
            }}
            isOpen={showFrequencyDropdown}
            onToggle={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
          />

          {/* Source of Funds Dropdown */}
          <Dropdown
            label="Source of Funds"
            placeholder="Select source of funds"
            value={sourceOfFunds}
            options={sourceOptions}
            onSelect={(value) => {
              setSourceOfFunds(value);
              setShowSourceDropdown(false);
            }}
            isOpen={showSourceDropdown}
            onToggle={() => setShowSourceDropdown(!showSourceDropdown)}
          />

          {/* Info Box */}
          <View className="mb-8 rounded-lg bg-blue-100 p-4">
            <Text className="mb-2 font-semibold text-gray-900">Info:</Text>
            <Text className="text-sm text-gray-700">
              • This savings will serve as collateral for a loan you can contribute as little as
              ₦1,000
            </Text>
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6">
          <TouchableOpacity
            onPress={handleContinue}
            className="items-center rounded-lg bg-[#157196] py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
