// screens/CodeVerified.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function CodeVerified() {
  const handleContinue = () => {
    navigateTo('openAccountSecurity');
    // Navigate to next screen
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className={`h-full rounded-full `}
            style={{ width: '66.66%', backgroundColor: Colors?.primary }}
          />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 4 of 6</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Success Icon */}
        <View className="mb-8">
          <View
            className="h-32 w-32 items-center justify-center rounded-full"
            style={{
              backgroundColor: Colors?.primary,
              borderWidth: 8,
              borderColor: Colors?.accent,
            }}>
            <MaterialIcons name="check" size={60} color="white" />
          </View>
        </View>

        {/* Title */}
        <Text className="mb-3 text-center text-2xl font-bold text-gray-900">Code Verified</Text>

        {/* Subtitle */}
        <Text className="mb-16 text-center text-base leading-6 text-gray-600">
          Your phone number has been verified successfully
        </Text>
      </View>

      {/* Continue Button - Fixed at Bottom */}
      <View className="px-6 pb-8">
        <TouchBtn
          onPress={handleContinue}
          label="Continue"
          textClassName="text-base font-bold text-white"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}
