// screens/FirstScanCompleted.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function FirstScanCompleted() {
  const handleContinue = () => {
    // Navigate to second scan
    console.log('Continue to second scan');
  };

  return (
    <View className="flex-1 bg-white px-6">
      <View className="flex-1 items-center justify-center">
        {/* Success Icon */}
        <View className="mb-8 h-24 w-24 items-center justify-center rounded-full border-4 border-green-500">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-green-500">
            <Ionicons name="checkmark" size={48} color="white" strokeWidth={3} />
          </View>
        </View>

        {/* Title */}
        <Text className="mb-4 text-center text-xl font-bold text-blue-700">
          First Scan Completed
        </Text>

        {/* Description */}
        <Text className="text-center text-[15px] leading-6 text-gray-500">
          Now complete a second scan to capture{'\n'}the edges of your face
        </Text>
      </View>

      {/* Continue Button */}
      <View className="pb-8">
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full rounded-xl py-4"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.8}>
          <Text className="text-center text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}