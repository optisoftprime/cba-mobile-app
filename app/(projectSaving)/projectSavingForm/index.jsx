// screens/ProjectSavingsForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';
import Dropdown from 'components/dropDown';

export default function ProjectSavingsForm() {
  const [projectName, setProjectName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [contributionFrequency, setContributionFrequency] = useState('');

  const [showProjectNameDropdown, setShowProjectNameDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  const projectNameOptions = [
    { label: 'Building', value: 'building' },
    { label: 'Business', value: 'business' },
    { label: 'Family', value: 'family' },
    { label: 'Others', value: 'others' },
  ];

  const frequencyOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Manual', value: 'manual' },
  ];

  const calculateSavingsMessage = () => {
    if (!targetAmount || !contributionFrequency) return '';

    const amount = parseFloat(targetAmount.replace(/,/g, ''));
    if (isNaN(amount)) return '';

    const frequency = frequencyOptions.find((f) => f.value === contributionFrequency)?.label || '';
    return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} would be saved every ${frequency.toLowerCase()}`;
  };

  const handleContinue = () => {
    console.log('Form submitted:', {
      projectName,
      targetAmount,
      targetDate,
      contributionFrequency,
    });
    navigateTo("projectSavings")
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Project Savings"
          showLeftIcon={true}
          onLeftPress={navigateBack}
          color="black"
        />
        <WalletCard
          walletName="Project Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#D97706"
        />
        {/* Wallet Card */}
        <View className="px-4"></View>

        <View className="flex-1 px-5 pt-6">
          {/* Project Name Dropdown */}
          <Dropdown
            label="Project Name"
            placeholder="Select what you're saving for"
            value={projectName}
            options={projectNameOptions}
            onSelect={(value) => {
              setProjectName(value);
              setShowProjectNameDropdown(false);
            }}
            isOpen={showProjectNameDropdown}
            onToggle={() => setShowProjectNameDropdown(!showProjectNameDropdown)}
          />

          {/* Target Amount */}
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

          {/* Target Date */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Target Date</Text>
            <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className="flex-1 text-base text-gray-400">Select date</Text>
              <Ionicons name="calendar-outline" size={20} color="#0EA5E9" />
            </TouchableOpacity>
          </View>

          {/* Contribution Frequency Dropdown */}
          <Dropdown
            label="Contribution Frequency"
            placeholder="How will you save"
            value={contributionFrequency}
            options={frequencyOptions}
            onSelect={(value) => {
              setContributionFrequency(value);
              setShowFrequencyDropdown(false);
            }}
            isOpen={showFrequencyDropdown}
            onToggle={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
          />

          {/* Savings Calculation Message */}
          {calculateSavingsMessage() && (
            <View className="mb-6 rounded-lg bg-blue-50 p-3">
              <Text className="text-sm text-blue-700">{calculateSavingsMessage()}</Text>
            </View>
          )}
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
