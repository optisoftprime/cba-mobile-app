// screens/ChildrenSavingsList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';

export default function ChildrenSavingsList() {
  const savings = [
    {
      id: 1,
      childName: 'David John',
      targetAmount: '₦400,000',
      totalSaved: '₦20,000',
      interestRate: '5%',
      status: 'Active',
      progress: 60,
    },
    {
      id: 2,
      childName: 'David John',
      targetAmount: '₦400,000',
      totalSaved: '₦20,000',
      interestRate: '5%',
      status: 'Active',
      progress: 60,
    },
    {
      id: 3,
      childName: 'David John',
      targetAmount: '₦400,000',
      totalSaved: '₦20,000',
      interestRate: '5%',
      status: 'Active',
      progress: 60,
    },
  ];

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
  };

  const handleTopUp = () => {
    console.log('Top Up pressed');
  };

  const handleCreateChildSavings = () => {
    console.log('Create Child Savings pressed');
    navigateTo('childSavingsForm');
  };

  const handleViewDetails = (savingId) => {
    console.log('View details for saving:', savingId);
    navigateTo('childSavingsDetails', { id: savingId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Children's Savings" onLeftPress={navigateBack} showLeftIcon={true} />
        
        <WalletCard
          walletName="Children Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#5C4033"
          topRightText="Withdraw"
          topRightAction={handleWithdraw}
          topRightIcon="account-balance-wallet"
          bottomRightText="Top Up"
          bottomRightAction={handleTopUp}
          bottomRightIcon="add-circle"
        />

        <View className="px-4">
          {/* Create Child Savings Button */}
          <TouchableOpacity
            onPress={handleCreateChildSavings}
            className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold text-[#157196]">Create Child Savings</Text>
          </TouchableOpacity>

          {/* Savings List */}
          {savings.map((saving) => (
            <View
              key={saving.id}
              className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Book/Education Image */}
                <View className="mr-4 h-28 w-28 items-center justify-center rounded-xl bg-blue-100">
                  <Image
                    source={require('../../../assets/Frame 427320095.png')}
                    style={{ width: 112, height: 112 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Savings Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Child Name: </Text>
                    {saving.childName}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Target Amount: </Text>
                    {saving.targetAmount}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Total Saved: </Text>
                    {saving.totalSaved}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Interest Rate: </Text>
                    {saving.interestRate}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{saving.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full bg-[#157196]"
                      style={{ width: `${saving.progress}%` }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {saving.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(saving.id)}
                    className="items-center rounded-lg bg-[#157196] py-2">
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