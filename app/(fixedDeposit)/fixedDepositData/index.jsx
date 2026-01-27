// screens/FixedDepositInfo.jsx
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';

export default function FixedDepositInfo() {
  const handleStartFixedDeposit = () => {
    navigateTo('fixedDepositScreen');
    // Navigate to fixed deposit form
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#2E5423' }}>
      <StatusBar barStyle="light-content" />

      <ScrollView className="mt-5 flex-1 px-4 pt-12">
        {/* Hero Image Card */}
        <View className="mb-6 overflow-hidden rounded-3xl bg-white">
          <Image
            source={require('../../../assets/image 52.png')}
            style={{ width: '100%', height: 160 }}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text className="mb-2 text-3xl font-bold text-white">Grow Your Money{'\n'}Securely</Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-yellow-300">Benefits/Features</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Set a fixed term: 1,3,6 months
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Higher interest rate than higher savings
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Cannot withdraw until maturity
              </Text>
            </View>
          </View>
        </View>

        {/* Interest/Rewards Section */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-bold text-yellow-300">Interest/Rewards</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">8% per term (fixed)</Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Rewards: Points for early set up or long term deposit
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Button - Fixed at bottom */}
      <View className="px-4 pb-8 pt-4">
        <TouchBtn
          onPress={handleStartFixedDeposit}
          label="Start Fixed Deposit"
          backgroundColor="white"
          textColor="#2E5423" // dark green color
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}
