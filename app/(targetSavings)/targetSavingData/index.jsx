import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';

export default function TargetSavingsPage() {
  return (
    <ScrollView className="flex-1 bg-[#B4872A]">
      {/* Header Image */}
      <View className="mx-5 mt-20 overflow-hidden rounded-2xl bg-white p-6">
        <Image
          source={require('../../../assets/Frame 2147223550.png')}
          className="h-48 w-full rounded-lg"
        />
      </View>

      {/* Content */}
      <View className="mx-5 mb-8 mt-8">
        {/* Title */}
        <Text className="mb-8 text-2xl font-bold text-white">Save Towards Your Goal</Text>

        {/* Benefits/Features Section */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-bold text-white">Benefits/Features</Text>
          <View className="gap-2">
            <View className="flex-row items-start gap-3">
              <Text className="mt-1 text-lg text-white">•</Text>
              <Text className="flex-1 text-sm text-white">Set a target amount deadline</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="mt-1 text-lg text-white">•</Text>
              <Text className="flex-1 text-sm text-white">
                Auto-Save options to reach your goal faster
              </Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="mt-1 text-lg text-white">•</Text>
              <Text className="flex-1 text-sm text-white">Track Progress with visual goal bar</Text>
            </View>
          </View>
        </View>

        {/* Interest/Rewards Section */}
        <View className="mb-8">
          <Text className="mb-3 text-lg font-bold text-white">Interest/Rewards</Text>
          <View className="gap-2">
            <View className="flex-row items-start gap-3">
              <Text className="mt-1 text-lg text-white">•</Text>
              <Text className="flex-1 text-sm text-white">Interest 6% per month</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="mt-1 text-lg text-white">•</Text>
              <Text className="flex-1 text-sm text-white">
                Rewards: Extra points for reaching mile stone
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Start Saving Button */}
      <View className="mx-5 mb-8">
        <TouchBtn
          onPress={() => navigateTo('targetSaving')}
          label="Start Saving"
          backgroundColor="white"
          textColor="#B45309" // amber-700 color
          textClassName="font-bold text-lg"
          buttonClassName="rounded-lg py-4 items-center"
          containerClassName=""
        />
      </View>
    </ScrollView>
  );
}
