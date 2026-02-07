// screens/LoanInfo.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';

export default function LoanInfo() {
  const handleStartFixedDeposit = () => {
    console.log('Start Fixed Deposit pressed');
    navigateTo('loanForm');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#291B54' }}>
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
          Get Funds Instantly, Pay{'\n'}Flexibly
        </Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-white">Benefits/Features</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Quick approval and disbursement
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Flexible repayment schedules
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Competitive interest rates
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
              <Text className="flex-1 text-sm leading-6 text-white">6% monthly</Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Rewards: Earn points for timely repayment
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Fixed Deposit Button - Fixed at bottom */}
      <View className="px-4 pb-8 pt-4">
        <TouchBtn
          onPress={handleStartFixedDeposit}
          label="Start Loan Application"
          backgroundColor="white"
          textColor="#4C1D95" // purple-900 color
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}
