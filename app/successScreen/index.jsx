// screens/AccountSecured.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function AccountSecured() {
  const handleGoToDashboard = () => {
    navigateTo('landingScreen');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-8">
      {/* Success Icon */}
      <View className="mb-8">
        <View
          className="h-32 w-32 items-center justify-center rounded-full"
          style={{
            backgroundColor: Colors?.primary,
            borderWidth: 8,
            borderColor: Colors?.accent,
          }}>
          <Ionicons name="checkmark" size={60} color="white" />
        </View>
      </View>

      {/* Success Message */}
      <Text className="mb-16 px-4 text-center text-base leading-6 text-gray-600">
        Your account is now secured and ready for use
      </Text>

      {/* Go to Dashboard Button - Fixed at Bottom */}
      <View className="absolute bottom-6 left-8 right-8">
        <TouchBtn
          onPress={handleGoToDashboard}
          label="Go to Dashboard"
          textClassName="text-base font-semibold "
          buttonClassName="items-center rounded-lg py-4"
          activeOpacity={0.8}
          containerClassName=""
        />
      </View>
    </View>
  );
}
