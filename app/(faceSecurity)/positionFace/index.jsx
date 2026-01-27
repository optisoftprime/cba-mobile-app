// screens/FaceIDPosition.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function FaceIDPosition() {
  const handleContinue = () => {
    // Handle continue action
    navigateTo("firstScanComplete")
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Face ID" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <View className="flex-1 items-center justify-between px-6 pb-8 pt-12">
        {/* Face ID Icon */}
        <View className="flex-1 items-center justify-center">
          {/* Outer Circle */}
          <View className="mb-8 h-48 w-48 items-center justify-center rounded-full border-4 border-gray-300">
            {/* Inner Rounded Square */}
            <View
              className="h-32 w-32 items-center justify-center rounded-3xl border-4"
              style={{ borderColor: Colors.primary }}>
              {/* Checkmark Circle */}
              <View className="h-16 w-16 items-center justify-center rounded-full bg-green-500">
                <Ionicons name="checkmark" size={32} color="white" />
              </View>
            </View>
          </View>

          {/* Title */}
          <Text className="mb-2 text-center text-xl font-bold" style={{ color: Colors.primary }}>
            Position Your Face
          </Text>

          {/* Description */}
          <Text className="mb-6 text-center text-sm text-gray-600">
            Position your face within the frame and
          </Text>
          <Text className="mb-6 text-center text-sm text-gray-600">
            slowly move your head in a circle
          </Text>

          {/* Tips Section */}
          <View className="w-full rounded-lg bg-blue-50 p-4" style={{ width: 320 }}>
            <Text className="mb-2 text-sm font-semibold" style={{ color: Colors.primary }}>
              Tips:
            </Text>
            <View className="space-y-1">
              <View className="flex-row">
                <Text className="mr-2 text-sm text-gray-700">•</Text>
                <Text className="flex-1 text-sm text-gray-700">
                  Keep your face centered in the frame
                </Text>
              </View>
              <View className="flex-row">
                <Text className="mr-2 text-sm text-gray-700">•</Text>
                <Text className="flex-1 text-sm text-gray-700">
                  Move your head slowly in a circular motion
                </Text>
              </View>
              <View className="flex-row">
                <Text className="mr-2 text-sm text-gray-700">•</Text>
                <Text className="flex-1 text-sm text-gray-700">
                  Make sure you are in a well - lit area
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full rounded-lg py-4"
          style={{ backgroundColor: Colors.primary }}
          activeOpacity={0.8}>
          <Text className="text-center text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>

        {/* Bottom Indicator */}
        <View className="mt-4 h-1 w-20 rounded-full bg-gray-300" />
      </View>
    </View>
  );
}
