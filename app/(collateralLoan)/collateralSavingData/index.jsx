// screens/CollateralLoanInfo.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';

export default function CollateralLoanInfo() {
  const handleStartSaving = () => {
    console.log('Start Saving as Collateral pressed');
    navigateTo('collateralSavingForm');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#A0522D' }}>
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
          Save To Unlock Bigger Loan{'\n'}Access
        </Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-white">Benefits/Features</Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Your savings serves as collateral for loans
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Unlock up to 2X your saved amount as a loan
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Lower interest rate compared to regular loans
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Funds are safely locked while loan is active
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
              <Text className="flex-1 text-sm leading-6 text-white">
                Interest earned on saved funds while locked
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-white">•</Text>
              <Text className="flex-1 text-sm leading-6 text-white">
                Rewards: Bonus points for consistent saving timely loan repayment
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
          <Text className="text-base font-bold" style={{ color: '#A0522D' }}>
            Start Saving as Collateral
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
