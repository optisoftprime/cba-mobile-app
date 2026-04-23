// screens/CompulsorySavingsInfo.jsx
import React from 'react';
import { View, Text, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';

export default function CompulsorySavingsInfo() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#513B56' }}>
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
          Build Discipline,{'\n'}Grow Your Wealth
        </Text>

        {/* Benefits/Features Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-yellow-300">Benefits/Features</Text>
          <View className="space-y-2">
            {[
              'Mandatory savings plan that builds financial discipline',
              'Funds locked until maturity for maximum benefit',
              'Employer or self-directed contribution options',
              'Earn interest on every kobo saved',
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
              'Competitive interest rate on locked funds',
              'Rewards: Earn bonus points for unbroken savings streaks',
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
          onPress={() => navigateTo('rizeSpringsSavings', { productType: 'COMPULSORY' })}
          label="View Compulsory Savings"
          backgroundColor="transparent"
          textColor="white"
          borderColor="white"
          borderWidth={1}
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />

        <TouchBtn
          onPress={() => navigateTo('childrenSavingForm')}
          label="Start Compulsory Savings"
          backgroundColor="white"
          textColor="#513B56"
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}