// screens/BudgetBlitz.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Colors } from 'config/theme';

export default function BudgetBlitz() {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 'A',
      label: 'A',
      text: '₦500 - Live it up!',
      color: 'bg-gray-400',
    },
    {
      id: 'B',
      label: 'B',
      text: '₦300 - Balanced Fun',
      color: 'bg-gray-400',
    },
    {
      id: 'C',
      label: 'C',
      text: '₦200 - Smart Choice',
      color: 'bg-green-500',
      isCorrect: true,
    },
    {
      id: 'D',
      label: 'D',
      text: '₦50 - Minimal Spending',
      color: 'bg-gray-400',
    },
  ];

  const handleOptionPress = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <View className="flex-1 bg-white">
      <Header 
        title="Budget Blitz" 
        onLeftPress={navigateBack} 
        showLeftIcon={true} 
        color="black" 
      />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <Text className="mb-4 text-center text-sm text-gray-600">
          Make the smartest financial choice
        </Text>

        {/* Score and Level */}
        <View className="mb-6 flex-row items-center justify-end">
          <View className="mr-6 items-center">
            <Text className="text-xs text-gray-500">Score</Text>
            <Text className="text-xl font-bold" style={{ color: Colors.primary }}>0</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-500">Level</Text>
            <Text className="text-xl font-bold" style={{ color: Colors.primary }}>1</Text>
          </View>
        </View>

        {/* Scenario Card */}
        <View className="mb-6 rounded-2xl bg-orange-100 p-4">
          <Text className="mb-2 text-base font-bold text-gray-900">Scenario:</Text>
          <Text className="text-sm leading-relaxed text-gray-800">
            Your monthly income is ₦3000. Rent is ₦800, groceries ₦400, utilities ₦150. You want to save ₦500. What should you allocate for entertainment?
          </Text>
        </View>

        {/* Options */}
        <View className="mb-6">
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionPress(option.id)}
              className={`mb-3 flex-row items-center rounded-xl px-4 py-4 ${
                selectedOption === option.id ? 'bg-green-100' : 'bg-gray-50'
              }`}
              activeOpacity={0.7}>
              {/* Letter Badge */}
              <View
                className={`mr-3 h-10 w-10 items-center justify-center rounded-full ${
                  selectedOption === option.id ? option.color : 'bg-gray-400'
                }`}>
                <Text className="text-base font-bold text-white">{option.label}</Text>
              </View>

              {/* Option Text */}
              <Text className="flex-1 text-base text-gray-900">{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pro Tips Card */}
        <View className="mb-6 rounded-2xl bg-blue-100 p-4">
          <Text className="mb-3 text-base font-bold text-gray-900">Pro Tips:</Text>
          <View className="space-y-2">
            <View className="flex-row">
              <Text className="mr-2 text-sm text-gray-800">•</Text>
              <Text className="flex-1 text-sm text-gray-800">
                Always prioritize high-interest debt
              </Text>
            </View>
            <View className="flex-row">
              <Text className="mr-2 text-sm text-gray-800">•</Text>
              <Text className="flex-1 text-sm text-gray-800">
                Keep 3-6 months of expenses in emergency savings
              </Text>
            </View>
            <View className="flex-row">
              <Text className="mr-2 text-sm text-gray-800">•</Text>
              <Text className="flex-1 text-sm text-gray-800">
                Balance needs, wants, and savings in your budget
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}