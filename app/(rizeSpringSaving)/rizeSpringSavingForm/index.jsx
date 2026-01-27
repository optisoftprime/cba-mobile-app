import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';

export default function RizeSpringForm() {
  const [savingsType, setSavingsType] = useState('');
  const [savingsAmount, setSavingsAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [autoDebit, setAutoDebit] = useState(false);

  const [showSavingsTypeDropdown, setShowSavingsTypeDropdown] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const savingsTypeOptions = [
    { label: 'Regular Savings', value: 'regular' },
    { label: 'Emergency Fund', value: 'emergency' },
    { label: 'Vacation Fund', value: 'vacation' },
  ];

  const sourceOptions = [
    { label: 'Main Wallet', value: 'main_wallet' },
    { label: 'Bank Account', value: 'bank_account' },
    { label: 'Card', value: 'card' },
  ];

  const handleContinue = () => {
    // console.log('Form submitted:', {
    //   savingsType,
    //   savingsAmount,
    //   startDate,
    //   endDate,
    //   sourceOfFunds,
    //   autoDebit,
    // });
    navigateTo('rizeSpringsSavings');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="RizeSpring Savings"
          showLeftIcon={true}
          onLeftPress={navigateBack}
          color="black"
        />

        {/* Wallet Card */}
        <WalletBalanceCard
          color="#513B56"
          description="Across 7 savings plans"
          points="0 Points"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={true}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={false}
          containerClassName="mx-5 mb-8"
        />

        <View className="flex-1 px-5 pt-6">
          {/* Savings Types Dropdown */}
          <Dropdown
            label="Savings Types"
            placeholder="Select savings types"
            value={savingsType}
            options={savingsTypeOptions}
            onSelect={(value) => {
              setSavingsType(value);
              setShowSavingsTypeDropdown(false);
            }}
            isOpen={showSavingsTypeDropdown}
            onToggle={() => setShowSavingsTypeDropdown(!showSavingsTypeDropdown)}
          />

          {/* Savings Amount */}
          <View className="mb-4">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-gray-900">Savings Amount</Text>
            </View>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={savingsAmount}
              onChangeText={setSavingsAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Start Date */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Start Date</Text>
            <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className="flex-1 text-base text-gray-400">Select start date</Text>
              <Ionicons name="calendar-outline" size={20} color={Colors?.primary} />
            </TouchableOpacity>
          </View>

          {/* End Date */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">End Date</Text>
            <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className="flex-1 text-base text-gray-400">Select end date</Text>
              <Ionicons name="calendar-outline" size={20} color={Colors?.primary} />
            </TouchableOpacity>
          </View>

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

          {/* Auto Debit Toggle */}
          <View className="mb-8 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-900">Auto Debit</Text>
            <Switch
              value={autoDebit}
              onValueChange={setAutoDebit}
              trackColor={{ false: '#D1D5DB', true: Colors?.secondary }}
              thumbColor={autoDebit ? Colors?.primary : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Continue Button */}
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
