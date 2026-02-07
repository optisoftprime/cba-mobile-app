'use client';

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import WalletBalanceCard from 'components/walletCard';

export default function GoalSavingsDetail() {
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    setJoined(true);
    console.log('Joined goal savings');
  };

  /** Progress circle config */
  const SIZE = 128;
  const STROKE_WIDTH = 8;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const PERCENTAGE = 68;
  const PROGRESS = (PERCENTAGE / 100) * CIRCUMFERENCE;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <Header
        title="Target Savings"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <WalletBalanceCard
        walletName="Target Savings Wallet"
        balance="₦0.00"
        description="5% Interest Rate"
        color="#B4872A"
        onDescriptionPress={() => {}}
        showWalletName={true}
        showBalance={true}
        showBalanceToggle={true}
        showDescription={true}
        showDescriptionButton={true}
        showPoints={false}
        showWalletNumber={false}
        showCopyWallet={false}
        showTopRightButton={false}
        containerClassName="mx-5 mb-8"
      />

      {/* Progress Circle */}
      <View className="mx-4 mt-8 items-center rounded-lg bg-white pt-6 pb-4">
        <View style={{ width: SIZE, height: SIZE }}>
          <Svg width={SIZE} height={SIZE}>
            {/* Background */}
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#E5E7EB"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />

            {/* Progress */}
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={Colors.primary}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - PROGRESS}
              strokeLinecap="round"
              rotation="-90"
              origin={`${SIZE / 2}, ${SIZE / 2}`}
            />
          </Svg>

          {/* Center Text */}
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-3xl font-bold text-gray-900">
              {PERCENTAGE}%
            </Text>
          </View>
        </View>

        <Text className="mt-4 text-xl font-semibold text-gray-800">
          Dream Vacation
        </Text>
      </View>

      {/* Stats Card */}
      <View className="mx-4 mb-6 rounded-lg bg-white p-4">
        <View className="mb-4 flex-row justify-between">
          <Text className="text-lg" style={{ color: Colors.primary }}>
            Target Amount
          </Text>
          <Text className="font-semibold text-gray-800">₦600,000.00</Text>
        </View>

        <View className="mb-4 flex-row justify-between">
          <Text className="text-lg" style={{ color: Colors.primary }}>
            Saved so far
          </Text>
          <Text className="font-semibold text-gray-800">₦645,000.00</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-lg" style={{ color: Colors.primary }}>
            Remaining
          </Text>
          <Text className="font-semibold text-gray-800">₦355,000.00</Text>
        </View>
      </View>

      {/* Payout Rule */}
      <View className="mx-4 mb-6">
        <Text className="mb-2 font-semibold text-gray-800">Payout Rule</Text>
        <View className="rounded-lg bg-gray-100 p-4">
          <Text className="text-sm leading-relaxed text-gray-700">
            YOU COLLECT YOUR MONEY. No one has access to your savings but you.
            But you can share access to your spouse(s) or phone.
          </Text>
        </View>
      </View>

      {/* People Saving */}
      <View className="mx-4 mb-6">
        <View className="mb-4 flex-row items-center">
          <MaterialCommunityIcons name="account-multiple" size={20} color="#374151" />
          <Text className="ml-2 font-semibold text-gray-800">
            People saving towards this goal
          </Text>
        </View>

        {[
          { name: 'Chioma', amount: '₦135,000' },
          { name: 'Tunde', amount: '₦85,000' },
          { name: 'Amara', amount: '₦100,000' },
        ].map((person, idx) => (
          <View key={idx} className="mb-3 flex-row items-center rounded-lg bg-white p-4">
            <View
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: Colors.primary }}>
              <Text className="text-sm font-bold text-white">
                {person.name[0]}
              </Text>
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
        <TouchBtn
          onPress={handleJoin}
          label={joined ? 'Joined' : 'Join'}
          textClassName="text-center text-base font-bold"
          buttonClassName="rounded-lg py-4"
          disabled={joined}
        />
      </View>
    </ScrollView>
  );
}
