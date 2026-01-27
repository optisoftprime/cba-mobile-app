import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function OpenNewAccount() {
  const handleGetStarted = () => {
    navigateTo('stageOne');
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: Colors?.primary }}>
      <View className="min-h-screen flex-1 items-center justify-center px-5 py-12">
        {/* Card Container */}
        <View className="w-full items-center rounded-3xl bg-white p-8">
          {/* Star Icon */}
          <MaterialCommunityIcons name="star" size={48} color="#FFD700" />

          {/* Title */}
          <Text className="mb-2 mt-6 text-2xl font-bold text-gray-900">Open New Account</Text>

          {/* Subtitle */}
          <Text className="mb-8 text-center text-sm text-gray-600">
            Create a RizeSpring account in just a few steps
          </Text>

          {/* Features List */}
          <View className="mb-8 w-full gap-4">
            {/* Feature 1 */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={21} color={Colors?.primary} />
              <Text className="ml-3 flex-1 text-sm text-gray-800">
                Quick and easy setup process
              </Text>
            </View>

            {/* Feature 2 */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={21} color={Colors?.primary} />
              <Text className="ml-3 flex-1 text-sm text-gray-800">
                Bank-grade security and encryption
              </Text>
            </View>

            {/* Feature 3 */}
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="check-circle" size={21} color={Colors?.primary} />
              <Text className="ml-3 flex-1 text-sm text-gray-800">
                Your account ready in minutes
              </Text>
            </View>
          </View>

          {/* Get Started Button */}
          <View className="w-full">
            <TouchBtn
              onPress={handleGetStarted}
              label="Get Started"
              textClassName="text-base font-bold"
              buttonClassName="w-full items-center rounded-lg py-4"
              containerClassName=""
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
