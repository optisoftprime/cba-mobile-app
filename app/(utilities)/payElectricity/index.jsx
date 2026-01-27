// screens/PayElectricity.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function PayElectricity() {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMeterType, setSelectedMeterType] = useState('');
  const [showProviderDropdown, setShowProviderDropdown] = useState(false);
  const [showMeterTypeDropdown, setShowMeterTypeDropdown] = useState(false);

  const providerOptions = [
    { label: 'Ikeja Electric', value: 'ikeja_electric' },
    { label: 'Eko Electricity Distribution (EKEDC)', value: 'ekedc' },
    { label: 'Abuja Electricity Distribution (AEDC)', value: 'aedc' },
    { label: 'Port Harcourt Electric', value: 'phed' },
    { label: 'Ibadan Electricity Distribution (IBEDC)', value: 'ibedc' },
    { label: 'Enugu Electricity Distribution (EEDC)', value: 'eedc' },
  ];

  const meterTypeOptions = [
    { label: 'Prepaid', value: 'prepaid' },
    { label: 'Postpaid', value: 'postpaid' },
  ];

  const handleContinue = () => {
    console.log('Electricity payment details:', {
      selectedProvider,
      meterNumber,
      amount,
      selectedMeterType,
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
          title="Electricity"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Provider Dropdown */}
          <Dropdown
            label="Provider"
            placeholder="Select provider, e.g Ikeja electric"
            value={selectedProvider}
            options={providerOptions}
            onSelect={(value) => {
              setSelectedProvider(value);
              setShowProviderDropdown(false);
            }}
            isOpen={showProviderDropdown}
            onToggle={() => setShowProviderDropdown(!showProviderDropdown)}
          />

          {/* Meter Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Meter Number</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={meterNumber}
              onChangeText={setMeterNumber}
              placeholder="Enter meter number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          {/* Amount */}
          <View className="mb-4">
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

          {/* Meter Type Dropdown */}
          <Dropdown
            label="Meter Type"
            placeholder="Prepaid"
            value={selectedMeterType}
            options={meterTypeOptions}
            onSelect={(value) => {
              setSelectedMeterType(value);
              setShowMeterTypeDropdown(false);
            }}
            isOpen={showMeterTypeDropdown}
            onToggle={() => setShowMeterTypeDropdown(!showMeterTypeDropdown)}
          />
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