// screens/ChildSavingsInfo.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';

export default function ChildSavingsInfo() {
  const handleStartSaving = () => {
    console.log('Start Saving pressed');
    navigateTo('childrenSavingForm');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#5C4033' }}>
      <StatusBar barStyle="light-content" />

      <ScrollView className="mt-5 flex-1 px-4 pt-12">
        {/* Hero Image Card */}
        <View className="mb-6 overflow-hidden rounded-3xl bg-white">
          <Image
            source={require('../../../assets/image 52.png')}
            style={{ width: '100%', height: 180 }}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text className="mb-2 text-3xl font-bold text-white">
          Save For Your Child's{'\n'}Future With Ease
        </Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-white">Benefits/Features</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Save for school fees, education, or future need
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Parent-controlled savings
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Flexible contributions(one-time or reccurring)
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Earn interest while you save
              </Text>
            </View>
          </View>
        </View>

        {/* Interest/Rewards Section */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-bold text-white">Interest/Rewards</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">4% per month</Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Rewards: Earn points for consistent monthly savings
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Saving Button - Fixed at bottom */}
      <View className="px-4 pb-8 pt-4">
        <TouchableOpacity
          onPress={handleStartSaving}
          className="w-full items-center rounded-lg bg-white py-4">
          <Text className="text-base font-bold" style={{ color: '#5C4033' }}>
            Start Saving
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}