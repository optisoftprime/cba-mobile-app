// screens/EnableFaceID.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function EnableFaceID() {
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);

  const handleToggleFaceID = (value) => {
    setIsFaceIDEnabled(value);
    console.log('Face ID enabled:', value);
    // Implement biometric authentication setup here
  };

  return (
    <View className="flex-1">
      <Header
        title="Enable Face ID"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <View className="mt-2 bg-white px-4 py-4">
        <View className="flex-row items-center justify-between">
          {/* Left Side - Icon and Text */}
          <View className="flex-1 flex-row items-center">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Ionicons name="finger-print-outline" size={22} color="#374151" />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-900">
                Enable Face ID
              </Text>
              <Text className="text-xs text-gray-500">
                Toggle on and off your face ID
              </Text>
            </View>
          </View>

          {/* Right Side - Toggle Switch */}
          <Switch
            value={isFaceIDEnabled}
            onValueChange={handleToggleFaceID}
            trackColor={{ false: '#D1D5DB', true: '#10B981' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#D1D5DB"
          />
        </View>
      </View>
    </View>
  );
}