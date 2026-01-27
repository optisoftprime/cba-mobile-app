// screens/TwoFactorAuthentication.jsx
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function TwoFactorAuthentication() {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const handleToggleTwoFactor = (value) => {
    setIsTwoFactorEnabled(value);
    console.log('Two Factor Authentication enabled:', value);
    // Implement 2FA setup here
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Two Factor Authentication"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <View className="mt-2 bg-white px-4 py-4">
        <View className="flex-row items-center justify-between">
          {/* Left Side - Icon and Text */}
          <View className="flex-1 flex-row items-center">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Ionicons name="mail-outline" size={22} color="#374151" />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-900">
                Enable Two Factor Authenti...
              </Text>
              <Text className="text-xs text-gray-500">
                Set your 2 factor authentication
              </Text>
            </View>
          </View>

          {/* Right Side - Toggle Switch */}
          <Switch
            value={isTwoFactorEnabled}
            onValueChange={handleToggleTwoFactor}
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#D1D5DB"
          />
        </View>
      </View>
    </View>
  );
}