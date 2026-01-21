// screens/CollateralLoanList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';

export default function CollateralLoanList() {
  const contributions = [
    {
      id: 1,
      contributedAmount: '₦10.00',
      dateContributed: 'Monthly',
      interestRate: '5%',
      status: 'Active',
      progress: 65,
    },
    {
      id: 2,
      contributedAmount: '₦10.00',
      dateContributed: 'Monthly',
      interestRate: '5%',
      status: 'Active',
      progress: 65,
    },
    {
      id: 3,
      contributedAmount: '₦10.00',
      dateContributed: 'Monthly',
      interestRate: '5%',
      status: 'Active',
      progress: 65,
    },
  ];

  const handleMakeContribution = () => {
    console.log('Make a Contribution pressed');
    navigateTo('collateralLoanForm');
  };

  const handleViewDetails = (contributionId) => {
    console.log('View details for contribution:', contributionId);
    navigateTo('collateralLoanDetails', { id: contributionId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Collateral Loan Savings" onLeftPress={navigateBack} showLeftIcon={true} />
        <WalletCard
          walletName="Collateral Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#A0522D"
        />

        <View className="px-4">
          {/* Wallet Card */}

          {/* Make a Contribution Button */}
          <TouchableOpacity onPress={handleMakeContribution} className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold text-[#157196]">Make a Contribution</Text>
          </TouchableOpacity>

          {/* Contributions List */}
          {contributions.map((contribution) => (
            <View
              key={contribution.id}
              className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Money Image */}
                <View className="mr-4 h-28 w-28 items-center justify-center overflow-hidden rounded-xl">
                  <Image
                    source={require('../../../assets/Frame 427320095.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Contribution Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-[#157196]">
                    <Text className="font-semibold">Contributed Amount: </Text>
                    {contribution.contributedAmount}
                  </Text>
                  <Text className="mb-1 text-xs text-[#157196]">
                    <Text className="font-semibold">Date Contributed: </Text>
                    {contribution.dateContributed}
                  </Text>
                  <Text className="mb-1 text-xs text-[#157196]">
                    <Text className="font-semibold">Interest Rate: </Text>
                    {contribution.interestRate}
                  </Text>
                  <Text className="mb-2 text-xs text-[#157196]">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{contribution.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full bg-[#157196]"
                      style={{ width: `${contribution.progress}%` }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {contribution.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(contribution.id)}
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
