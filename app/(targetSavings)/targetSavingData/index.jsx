import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';

export default function TargetSavingsPage() {
  return (
    <ScrollView className="flex-1 bg-[#B4872A]">
      {/* Header Image */}
      <View className="bg-white mx-5 mt-20 rounded-2xl overflow-hidden p-6">
        <Image
          source={require("../../../assets/Frame 2147223550.png")}
          className="w-full h-48 rounded-lg"
        />
      </View>

      {/* Content */}
      <View className="mx-5 mt-8 mb-8">
        {/* Title */}
        <Text className="text-white text-2xl font-bold mb-8">Save Towards Your Goal</Text>

        {/* Benefits/Features Section */}
        <View className="mb-8">
          <Text className="text-white text-lg font-bold mb-3">Benefits/Features</Text>
          <View className="gap-2">
            <View className="flex-row items-start gap-3">
              <Text className="text-white text-lg mt-1">•</Text>
              <Text className="text-white text-sm flex-1">Set a target amount deadline</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="text-white text-lg mt-1">•</Text>
              <Text className="text-white text-sm flex-1">Auto-Save options to reach your goal faster</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="text-white text-lg mt-1">•</Text>
              <Text className="text-white text-sm flex-1">Track Progress with visual goal bar</Text>
            </View>
          </View>
        </View>

        {/* Interest/Rewards Section */}
        <View className="mb-8">
          <Text className="text-white text-lg font-bold mb-3">Interest/Rewards</Text>
          <View className="gap-2">
            <View className="flex-row items-start gap-3">
              <Text className="text-white text-lg mt-1">•</Text>
              <Text className="text-white text-sm flex-1">Interest 6% per month</Text>
            </View>
            <View className="flex-row items-start gap-3">
              <Text className="text-white text-lg mt-1">•</Text>
              <Text className="text-white text-sm flex-1">Rewards: Extra points for reaching mile stone</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Start Saving Button */}
      <View className="mx-5 mb-8">
        <TouchableOpacity className="bg-white rounded-lg py-4 items-center" onPress={()=>{navigateTo("targetSaving")}}>
          <Text className="text-amber-700 font-bold text-lg">Start Saving</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
