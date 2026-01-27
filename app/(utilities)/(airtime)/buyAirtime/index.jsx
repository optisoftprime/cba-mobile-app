// screens/RechargeDetails.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { MtnLogoSvg, AirtelSvgLogo, NineMobileSvgLogo, GloLogoSvg } from 'svgs/networkSvg';
import TouchBtn from 'components/touchBtn';

export default function RechargeDetails() {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const networks = [
    {
      id: 'mtn',
      name: 'MTN',
      color: '#FFCC00',
      icon: () => <MtnLogoSvg />,
    },
    {
      id: 't2mobile',
      name: 'T2 MOBILE',
      color: '#FF4500',
      icon: () => <NineMobileSvgLogo />,
    },
    {
      id: 'airtel',
      name: 'AIRTEL',
      color: '#E60000',
      icon: () => <AirtelSvgLogo />,
    },
    {
      id: 'glo',
      name: 'GLO',
      color: '#00A651',
      icon: () => <GloLogoSvg />,
    },
  ];

  const handleContinue = () => {
    console.log('Recharge details:', {
      selectedNetwork,
      phoneNumber,
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
          title="Recharge Details"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Network Selection */}
          <View className="mb-6 flex-row justify-between">
            {networks.map((network) => (
              <TouchableOpacity
                key={network.id}
                onPress={() => setSelectedNetwork(network.id)}
                className="items-center"
                activeOpacity={0.7}>
                <View
                  className={`relative mb-2 h-16 w-16 items-center justify-center rounded-full ${
                    selectedNetwork === network.id ? 'border-2 border-blue-500' : ''
                  }`}
                  style={{ backgroundColor: network.color }}>
                  {network.icon()}

                  {/* Selected Checkmark */}
                  {selectedNetwork === network.id && (
                    <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full bg-green-500">
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  )}
                </View>
                <Text className="text-xs font-medium text-gray-700">{network.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Phone Number</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="09098765432"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              maxLength={11}
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

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-4 pb-6">
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
