'use client';

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import SavingsWalletCard from 'components/walletBox';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';

export default function GoalSavingsDetail() {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    console.log('Joined goal savings');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header with wallet card should be imported/included from your other file */}

      <Header title="Target Savings" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <SavingsWalletCard
        walletName="Target Savings Wallet"
        balance="₦0.00"
        description="5% Interest Rate"
        descriptionBackground="white"
        descriptionTextColor="text-gray-800"
        backgroundColor="bg-yellow-600"
        onDescriptionPress={() => {
          console.log('hey');
        }}
        backgroundImagePath={require('../../../assets/Vector .png')} // Adjust path as needed
        iconName="wallet" // Custom icon for target savings
        iconSize={16}
        iconColor="white"
        balanceTextSize="text-4xl"
        color="#B4872A"
      />

      {/* Progress Circle */}
      <View className=" mx-4 mt-8 items-center rounded-lg bg-white pt-3">
        <View className="relative h-32 w-32 items-center justify-center rounded-full border-8 border-[#157196] bg-white">
          <Text className="text-black-600 text-3xl font-bold">68%</Text>
        </View>
        <Text className="mt-4 text-xl font-semibold text-gray-800">Dream Vacation</Text>
      </View>

      {/* Stats Card */}
      <View className="mx-4 mb-6 rounded-lg bg-white p-4">
        <View className="mb-4 flex flex-row justify-between">
          <Text className="text-lg text-[#157196]">Target Amount</Text>
          <Text className="font-semibold text-gray-800">₦600,000.00</Text>
        </View>
        <View className="mb-4 flex flex-row justify-between">
          <Text className="text-lg text-[#157196]">Saved so far</Text>
          <Text className="font-semibold text-gray-800">₦645,000.00</Text>
        </View>
        <View className="mb-4 flex flex-row justify-between">
          <Text className="text-lg text-[#157196]">Remaining</Text>
          <Text className="font-semibold text-gray-800">₦355,000.00</Text>
        </View>
      </View>

      {/* Payout Rule Section */}
      <View className="mx-4 mb-6">
        <Text className="mb-2 font-semibold text-gray-800">Payout Rule</Text>
        <View className="rounded-lg bg-gray-100 p-4">
          <Text className="text-sm leading-relaxed text-gray-700">
            YOU COLLECT YOUR MONEY. No one has access to your savings but you. But you can share
            access to your spouse(s) or phone.
          </Text>
        </View>
      </View>

      {/* Payout Dates */}
      <View className="mx-4 mb-6">
        <Text className=" font-semibold text-gray-800">Payout Dates</Text>

        <View className="space-y-3">
          {/* Create the data structure */}
          {(() => {
            const payoutData = [
              { label: 'Start Date', value: '8th Oct 2025' },
              { label: 'Start Date', value: '8th Oct 2025' },
              { label: 'Frequency', value: '8th Oct 2025' },
              { label: 'Frequency', value: '8th Oct 2025' },
              { label: 'Interest Per Annum', value: '8th Oct 2025' },
              { label: 'Interest Per Annum', value: '8th Oct 2025' },
            ];

            // Group into pairs of 2
            const rows = [];
            for (let i = 0; i < payoutData.length; i += 2) {
              rows.push(payoutData.slice(i, i + 2));
            }

            return rows.map((row, rowIndex) => (
              <View key={rowIndex} className="flex-row gap-2 mt-3">
                {row.map((item, colIndex) => (
                  <View
                    key={`${rowIndex}-${colIndex} `}
                    className="flex-1 rounded-lg border border-gray-200 bg-white p-3">
                    <Text className="mb-1 text-xs text-gray-500">{item.label}</Text>
                    <Text className="text-sm font-medium text-gray-800">{item.value}</Text>
                  </View>
                ))}
              </View>
            ));
          })()}
        </View>
      </View>

      {/* Interest Section */}
      {/* <View className="mx-4 mb-6">
        <Text className="mb-3 font-semibold text-gray-800">Interest for you</Text>
        <View className="rounded-lg border border-gray-200 bg-white p-4">
          <Text className="font-semibold text-[#157196]-600">₦5,500</Text>
        </View>
      </View> */}

      {/* People Saving Towards Goal */}
      <View className="mx-4 mb-6">
        <View className="mb-4 flex-row items-center">
          <MaterialCommunityIcons name="account-multiple" size={20} color="#374151" />
          <Text className="ml-2 font-semibold text-gray-800">People saving towards this goal</Text>
        </View>

        {[
          { name: 'Chioma', amount: '₦135,000' },
          { name: 'Tunde', amount: '₦85,000' },
          { name: 'Amara', amount: '₦100,000' },
        ].map((person, idx) => (
          <View key={idx} className="mb-3 flex-row items-center rounded-lg bg-white p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#157196]">
              <Text className="text-sm font-bold text-white">{person.name[0]}</Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="font-medium text-gray-800">{person.name}</Text>
            </View>
            <Text className="font-semibold text-gray-800">{person.amount}</Text>
          </View>
        ))}
      </View>

      {/* Join Button */}
      <View className="mx-4 mb-8">
        <TouchableOpacity
          onPress={handleJoin}
          className={`rounded-lg py-4 ${joined ? 'bg-gray-300' : 'bg-[#157196]'}`}
          disabled={joined}>
          <Text
            className={`text-center text-base font-bold ${joined ? 'text-gray-600' : 'text-white'}`}>
            {joined ? 'Joined' : 'Join'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
