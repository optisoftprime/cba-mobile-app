import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function TargetSavingsSummary() {
  const handleStartSavings = () => {
    // console.log('Start Target Savings pressed');
    navigateTo('goalSavings');
  };

  const handleCancel = () => {
    console.log('Cancel pressed');
  };

  const summaryData = {
    goalName: 'Vacation',
    targetAmount: '₦200,000',
    targetDate: '12/09/2026',
    suggestedContribution: '₦5,000',
    frequency: 'Monthly',
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title={'Summary'} showLeftIcon={true} color="black" />

      {/* Summary Card with Linear Gradient */}
      <View className="mx-5 mt-6 overflow-hidden rounded-lg">
        <LinearGradient
          colors={Colors?.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="p-5">
          <View className="flex-row justify-between border-b border-white/20 py-4">
            <Text className="text-sm text-white/80">Goal Name</Text>
            <Text className="text-sm font-semibold text-white">{summaryData.goalName}</Text>
          </View>

          <View className="flex-row justify-between border-b border-white/20 py-4">
            <Text className="text-sm text-white/80">Target Amount</Text>
            <Text className="text-sm font-semibold text-white">{summaryData.targetAmount}</Text>
          </View>

          <View className="flex-row justify-between border-b border-white/20 py-4">
            <Text className="text-sm text-white/80">Target Date</Text>
            <Text className="text-sm font-semibold text-white">{summaryData.targetDate}</Text>
          </View>

          <View className="flex-row justify-between border-b border-white/20 py-4">
            <Text className="text-sm text-white/80">Suggested Contribution Amount</Text>
            <Text className="text-sm font-semibold text-white">
              {summaryData.suggestedContribution}
            </Text>
          </View>

          <View className="flex-row justify-between py-4">
            <Text className="text-sm text-white/80">Contribution Frequency</Text>
            <Text className="text-sm font-semibold text-white">{summaryData.frequency}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Buttons */}
      <View className="mx-5 mt-12 gap-3">
        <TouchBtn
          onPress={handleStartSavings}
          label="Start Target Savings"
          textClassName="text-center font-semibold text-white"
          buttonClassName="rounded-lg py-4"
          containerClassName=""
        />

        <TouchBtn
          onPress={handleCancel}
          label="Cancel"
          backgroundColor="white"
          borderColor="#9CA3AF" // Tailwind's gray-300
          borderWidth={1}
          textColor={Colors?.primary}
          textClassName="text-center font-semibold"
          buttonClassName="rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </ScrollView>
  );
}
