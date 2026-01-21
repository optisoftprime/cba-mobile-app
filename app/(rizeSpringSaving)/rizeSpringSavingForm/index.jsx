import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import Dropdown from 'components/dropDown';

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
    navigateTo("rizeSpringsSavings")
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
        <View className="mx-5 mt-4 rounded-2xl bg-[#5B4570] p-5">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="wallet-outline" size={16} color="white" />
            <Text className="ml-2 text-sm text-white">Rize Spring Savings Wallet</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-4xl font-bold text-white">₦0.00</Text>
            <Ionicons name="eye-outline" size={20} color="white" style={{ marginLeft: 8 }} />
          </View>
          <View className="mt-3 self-start rounded-full bg-white/20 px-3 py-1">
            <Text className="text-xs text-white">6% Interest Rate</Text>
          </View>
        </View>

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
              <Ionicons name="calendar-outline" size={20} color="#0EA5E9" />
            </TouchableOpacity>
          </View>

          {/* End Date */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">End Date</Text>
            <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className="flex-1 text-base text-gray-400">Select end date</Text>
              <Ionicons name="calendar-outline" size={20} color="#0EA5E9" />
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
              trackColor={{ false: '#D1D5DB', true: '#4ADE80' }}
              thumbColor={autoDebit ? '#22C55E' : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Continue Button */}
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