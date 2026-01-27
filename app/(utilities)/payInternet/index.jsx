// screens/PayInternet.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function PayInternet() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);

  const providerOptions = [
    { label: 'Spectranet', value: 'spectranet' },
    { label: 'Smile', value: 'smile' },
    { label: 'Swift', value: 'swift' },
    { label: 'Ipnx', value: 'ipnx' },
  ];

  const internetPlans = [
    { label: 'Basic - ₦5,000/month', value: 'basic_5000' },
    { label: 'Standard - ₦10,000/month', value: 'standard_10000' },
    { label: 'Premium - ₦20,000/month', value: 'premium_20000' },
    { label: 'Ultra - ₦35,000/month', value: 'ultra_35000' },
  ];

  const handleContinue = () => {
    console.log('Internet payment details:', {
      selectedProvider,
      selectedPlan,
      accountNumber,
      amount,
    });
    navigateTo('transactionReceipt');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Internet"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Internet Provider Dropdown */}
          <Dropdown
            label="Internet Provider"
            placeholder="Select provider, e.g spectranet, smile"
            value={selectedProvider}
            options={providerOptions}
            onSelect={(value) => {
              setSelectedProvider(value);
              setShowProviderDropdown(false);
            }}
            isOpen={showProviderDropdown}
            onToggle={() => setShowProviderDropdown(!showProviderDropdown)}
          />

          {/* Internet Plan Dropdown */}
          <Dropdown
            label="Internet Plan"
            placeholder="Select internet plan"
            value={selectedPlan}
            options={internetPlans}
            onSelect={(value) => {
              setSelectedPlan(value);
              setShowPlanDropdown(false);
              // Auto-fill amount based on selected plan
              const plan = internetPlans.find(p => p.value === value);
              if (plan) {
                const priceMatch = plan.label.match(/₦([\d,]+)/);
                if (priceMatch) {
                  setAmount(priceMatch[1]);
                }
              }
            }}
            isOpen={showPlanDropdown}
            onToggle={() => setShowPlanDropdown(!showPlanDropdown)}
          />

          {/* Account Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Account Number</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={accountNumber}
              onChangeText={setAccountNumber}
              placeholder="Enter account number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          {/* Amount */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={amount}
              onChangeText={setAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchBtn
          onPress={handleContinue}
          label="Continue"
          backgroundColor={Colors?.primary}
          textColor="white"
          buttonClassName="items-center rounded-lg py-4"
          textClassName="text-base font-semibold"
          containerClassName="px-4 pb-6"
          activeOpacity={0.8}
        />
      </ScrollView>
    </View>
  );
}