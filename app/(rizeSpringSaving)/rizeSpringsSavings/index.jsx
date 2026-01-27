// screens/RizeSpringList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';

export default function RizeSpringList() {
  const savingsPlans = [
    {
      id: 1,
      totalSaved: '₦100,000',
      estimatedSavings: '₦250,000',
      frequency: '12/09/2026',
      nextSave: 'Today, 12:00PM',
      status: 'Active',
      progress: 65,
    },
    {
      id: 2,
      totalSaved: '₦100,000',
      estimatedSavings: '₦250,000',
      frequency: '12/09/2026',
      nextSave: 'Today, 12:00PM',
      status: 'Active',
      progress: 65,
    },
    {
      id: 3,
      totalSaved: '₦100,000',
      estimatedSavings: '₦250,000',
      frequency: '12/09/2026',
      nextSave: 'Today, 12:00PM',
      status: 'Active',
      progress: 65,
    },
  ];

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
  };

  const handleCreateNewPlan = () => {
    console.log('Create New Savings Plan pressed');
    navigateTo('rizeSpringData');
  };

  const handleViewDetails = (planId) => {
    // console.log('View details for plan:', planId);
    // navigateTo('rizeSpringDetails', { id: planId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="RizeSpring Savings"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />
        <WalletBalanceCard
          walletName="Rize Spring Savings Wallet"
          balance="₦0.00"
          description="6% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#5B4570"
          topRightText="Withdraw"
          topRightAction={handleWithdraw}
          topRightIcon="account-balance-wallet"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={true}
          containerClassName="mx-5 mb-8"
        />

        <View className="px-4">
          {/* Wallet Card with Withdraw Button */}

          {/* Create New Savings Plan Button */}
          <TouchableOpacity onPress={handleCreateNewPlan} className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold " style={{ color: Colors?.primary }}>
              Create New Savings Plan
            </Text>
          </TouchableOpacity>

          {/* Savings Plans List */}
          {savingsPlans.map((plan) => (
            <View key={plan.id} className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Phone Image/Icon */}
                <View className="mr-4 h-28 w-28 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-purple-500">
                  <Image
                    source={require('../../../assets/Frame 427320095.png')}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Plan Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Total Saved: </Text>
                    {plan.totalSaved}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Estimated Savings Amount: </Text>
                    {plan.estimatedSavings}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Frequency: </Text>
                    {plan.frequency}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Next Save: </Text>
                    {plan.nextSave}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{plan.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full bg-[#157196]"
                      style={{ width: `${plan.progress}%`, backgroundColor: Colors?.primary }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {plan.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(plan.id)}
                    className="items-center rounded-lg py-2"
                    style={{ backgroundColor: Colors?.primary }}>
                    <Text className="text-xs font-semibold text-white">View Savings Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
