import React from 'react';
import { View, Text, ScrollView, Image, StatusBar } from 'react-native';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';

export default function TargetSavingsInfo() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#5B4A6F' }}>
      <StatusBar barStyle="light-content" />

      <ScrollView className="mt-5 flex-1 px-4 pt-12">
        <View className="mb-6 overflow-hidden rounded-3xl bg-white">
          <Image
            source={require('../../../assets/image 52.png')}
            style={{ width: '100%', height: 180 }}
            resizeMode="cover"
          />
        </View>

        <Text className="mb-2 text-3xl font-bold text-white">
          Lock Your Money,{'\n'}Earn More Interest
        </Text>

        <View className="mb-6">
          <Text className="mb-3 text-base font-bold text-yellow-300">Benefits/Features</Text>
          <View className="space-y-2">
            {[
              'Lock funds for a fixed period and earn guaranteed interest',
              'No risk — your principal is fully protected',
              'Automatic renewal options available',
            ].map((item) => (
              <View key={item} className="flex-row items-start">
                <Text className="mr-2 text-white">•</Text>
                <Text className="flex-1 text-sm leading-6 text-white">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="mb-3 text-base font-bold text-yellow-300">Interest/Rewards</Text>
          <View className="space-y-2">
            {[
              '8% per annum on locked funds',
              '30 points per ₦1,000 saved',
            ].map((item) => (
              <View key={item} className="flex-row items-start">
                <Text className="mr-2 text-white">•</Text>
                <Text className="flex-1 text-sm leading-6 text-white">{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="gap-y-3 px-4 pb-8 pt-4">
        <TouchBtn
          onPress={() => navigateTo('rizeSpringsSavings')}
          label="View Fixed Savings"
          backgroundColor="transparent"
          textColor="white"
          borderColor="white"
          borderWidth={1}
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />

        <TouchBtn
          onPress={() => navigateTo('rizeSpringSavingForm')}
          label="Start Fixed Savings"
          backgroundColor="white"
          textColor="#5B4A6F"
          textClassName="text-base font-bold"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}