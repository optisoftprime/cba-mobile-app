// screens/OtpSelection.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function OtpSelection() {
  const [selectedMethod, setSelectedMethod] = useState('SMS');

  const otpMethods = [
    { id: 'SMS', label: 'SMS' },
    { id: 'Email', label: 'Email' },
    { id: 'App Authenticator', label: 'App Authenticator' },
  ];

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleContinue = () => {
    console.log('Selected OTP method:', selectedMethod);
    // Navigate to next screen or trigger OTP sending
    // navigateTo('otpVerification', { method: selectedMethod });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header
          title="Select"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-8">
          {otpMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => handleSelectMethod(method.id)}
              className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-4 py-4"
              activeOpacity={0.7}>
              <View
                className="mr-3 h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400"
                style={selectedMethod === method.id ? { borderColor: Colors?.primary } : {}}>
                {selectedMethod === method.id && (
                  <View
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: Colors?.primary }}
                  />
                )}
              </View>
              <Text className="text-base text-gray-900">{method.label}</Text>
            </TouchableOpacity>
          ))}

          {/* Information Text */}
          <Text className="mt-4 text-sm text-gray-600">
            You will receive an OTP, when making high risk transaction, When off, confirm with
            PIN or OTP
          </Text>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="mt-auto px-4 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName="mt-10"
          />
        </View>
      </ScrollView>
    </View>
  );
}