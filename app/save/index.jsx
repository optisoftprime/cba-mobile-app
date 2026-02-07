import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';

export default function SavingsPage() {
  const strictPlans = [
    {
      id: 'rizespring',
      title: 'RizeSpring Savings',
      description: 'Automatic, daily, weekly, or monthly saving',
      color: '#F0F9FF',
      imagePath: require('../../assets/image 29.png'),
      link: 'rizeSpringSavingData', // Make sure this matches your route name
    },
    {
      id: 'target',
      title: 'Target Savings',
      description: 'Smash your savings goal faster',
      color: '#E0E7FF',
      imagePath: require('../../assets/image 61.png'),
      link: 'targetSavingData', // Make sure this matches your route name
    },
    {
      id: 'project',
      title: 'Project Savings',
      description: 'Automatic, daily, weekly, or monthly savings',
      color: '#FEF08A',
      imagePath: require('../../assets/image 51.png'),
      link: 'projectSavingData', // Add a link if you want it to navigate
    },
    {
      id: 'children',
      title: 'Children Savings',
      description: 'Automatic, daily, weekly, or monthly savings',
      color: '#ECFDF5',
      imagePath: require('../../assets/image 35.png'),
      link: 'childrenSavingData', // Add a link if you want it to navigate
    },
  ];

  const investment = {
    id: 'fixed-deposit',
    title: 'Fixed Deposit',
    description: 'Automatic, daily, weekly, or monthly savings',
    color: '#FFFBEB',
    imagePath: require('../../assets/image 62.png'),
    link: 'fixedDepositData', 
  };

  // Function to handle navigation to savings plan details
  const handlePlanPress = (plan) => {
    console.log('Plan object:', plan);
    console.log('Link value:', plan.link);

    if (plan.link) {
      navigateTo(plan.link);
    } else {
      console.error('No link defined for this plan');
    }
  };

  // Handle when "Across 7 savings plans" button is pressed
  const handleSavingsPlansPress = () => {
    router.push('/savings/all-plans');
  };

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Header title={'My Savings'} showLeftIcon={true} color="black" />

      {/* Wallet Balance Card Component */}
      <WalletBalanceCard
        walletName="RizeSpring Savings Wallet"
        balance="₦0.00"
        description="Across 7 savings plans"
        onDescriptionPress={handleSavingsPlansPress}
        color="#0F5ED5"
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

      {/* Strict Savings Plans */}
      <View className="mb-8 px-5">
        <Text className="mb-4 text-base font-semibold text-gray-800">Strict Savings Plans</Text>
        <View className="flex-row flex-wrap justify-between">
          {strictPlans.map((plan, index) => (
            <TouchableOpacity
              key={index}
              className="mb-4 w-[48%] items-center rounded-2xl p-5"
              style={{ backgroundColor: plan.color }}
              onPress={() => handlePlanPress(plan)}>
              {/* Pass the entire plan object */}
              <Image
                source={plan.imagePath}
                style={{ width: 60, height: 60, marginBottom: 12 }}
                resizeMode="contain"
              />
              <Text className="text-center text-sm font-semibold text-gray-800">{plan.title}</Text>
              <Text className="mt-2 text-center text-xs text-gray-600">{plan.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Investment */}
      <View className="px-5 pb-8">
        <Text className="mb-4 text-base font-semibold text-gray-800">Investment</Text>
        <TouchableOpacity
          className="items-center rounded-2xl p-5"
          style={{ backgroundColor: investment.color }}
          onPress={() => handlePlanPress(investment)}>
          {/* Pass the entire investment object */}
          <Image
            source={investment.imagePath}
            style={{ width: 60, height: 60, marginBottom: 12 }}
            resizeMode="contain"
          />
          <Text className="mt-3 text-sm font-semibold text-gray-800">{investment.title}</Text>
          <Text className="mt-2 text-center text-xs text-gray-600">{investment.description}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
