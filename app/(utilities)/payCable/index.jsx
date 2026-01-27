// screens/PayCable.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function PayCable() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [smartCardNumber, setSmartCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);

  const providerOptions = [
    { label: 'DSTV', value: 'dstv' },
    { label: 'GOTV', value: 'gotv' },
    { label: 'StarTimes', value: 'startimes' },
    { label: 'ShowMax', value: 'showmax' },
  ];

  const handleContinue = () => {
    console.log('Cable payment details:', {
      selectedProvider,
      smartCardNumber,
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
          title="TV"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Provider Dropdown */}
          <Dropdown
            label="Provider"
            placeholder="Select provider, e.g DSTV, GOTV"
            value={selectedProvider}
            options={providerOptions}
            onSelect={(value) => {
              setSelectedProvider(value);
              setShowProviderDropdown(false);
            }}
            isOpen={showProviderDropdown}
            onToggle={() => setShowProviderDropdown(!showProviderDropdown)}
          />

          {/* Smart Card/Account Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Smart Card/Account Number
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={smartCardNumber}
              onChangeText={setSmartCardNumber}
              placeholder="Enter smart card/account number"
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