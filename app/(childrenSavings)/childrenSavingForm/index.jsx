// screens/ChildSavingsForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import WalletBalanceCard from 'components/walletCard';

export default function ChildSavingsForm() {
  const [childName, setChildName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');

  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const frequencyOptions = [
    { label: 'One Time', value: 'one_time' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const handleContinue = () => {
    console.log('Child Savings Form Submitted:', {
      childName,
      targetAmount,
      frequency,
      startDate,
    });
    navigateTo('childrenSavings');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Children Savings"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Children Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#5C4033"
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
          {/* Child Name Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Child Name</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={childName}
              onChangeText={setChildName}
              placeholder="Enter child name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Target Amount Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Target Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={targetAmount}
              onChangeText={setTargetAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Frequency Dropdown */}
          <Dropdown
            label="Frequency"
            placeholder="₦0.00"
            value={frequency}
            options={frequencyOptions}
            onSelect={(value) => {
              setFrequency(value);
              setShowFrequencyDropdown(false);
            }}
            isOpen={showFrequencyDropdown}
            onToggle={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
          />

          {/* Start Date Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Start Date <Text className="font-normal text-gray-600">(Optional)</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={startDate}
              onChangeText={setStartDate}
              placeholder="Select date"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Info Box */}
          <View className="mb-8 rounded-lg p-4" style={{ backgroundColor: Colors?.fade }}>
            <Text className="mb-2 font-semibold text-gray-900">Info:</Text>
            <Text className="text-sm text-gray-700">
              • 4% interest monthly and bonus points for consistent savings
            </Text>
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold text-white"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
