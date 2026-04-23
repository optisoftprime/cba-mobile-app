// screens/TargetSavingsInfo.jsx
import React from 'react';
import { View, Text, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';

export default function TargetSavingsInfo() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#B4872A' }}>
      <StatusBar barStyle="light-content" />

      <ScrollView className="mt-5 flex-1 px-4 pt-12">
        {/* Hero Image Card */}
        <View className="mb-6 overflow-hidden rounded-3xl bg-white">
          <Image
            source={require('../../../assets/Frame 2147223550.png')}
            style={{ width: '100%', height: 180 }}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text className="mb-2 text-3xl font-bold text-white">
          Save Towards{'\n'}Your Goal
        </Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-yellow-300">Benefits/Features</Text>
          <View className="space-y-2">
            {[
              'Set a target amount and deadline',
              'Auto-Save options to reach your goal faster',
              'Track progress with visual goal bar',
            ].map((item) => (
              <View key={item} className="flex-row items-start">
                <Text className="mr-2 text-white">•</Text>
                <Text className="flex-1 text-sm leading-6 text-white">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Interest/Rewards Section */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-bold text-yellow-300">Interest/Rewards</Text>
          <View className="space-y-2">
            {[
              'Interest 6% per month',
              'Rewards: Extra points for reaching milestones',
            ].map((item) => (
              <View key={item} className="flex-row items-start">
                <Text className="mr-2 text-white">•</Text>
                <Text className="flex-1 text-sm leading-6 text-white">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="gap-y-3 px-4 pb-8 pt-4">
        <TouchBtn
          onPress={() => navigateTo('rizeSpringsSavings', { productType: 'TARGET' })}
          label="View Target Savings"
          backgroundColor="transparent"
          textColor="white"
          borderColor="white"
          borderWidth={1}
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />

        <TouchBtn
          onPress={() => navigateTo('targetSaving')}
          label="Start Target Savings"
          backgroundColor="white"
          textColor="#B4872A"
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}