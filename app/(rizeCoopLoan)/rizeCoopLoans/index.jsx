// screens/RizeCoopLoanList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';

export default function RizeCoopLoanList() {
  const loans = [
    {
      id: 1,
      loanAmount: '₦400,000',
      collateralLocked: '₦200,000',
      repayableSchedule: 'Monthly',
      interest: '5%',
      status: 'Active',
      progress: 60,
    },
    {
      id: 2,
      loanAmount: '₦400,000',
      collateralLocked: '₦200,000',
      repayableSchedule: 'Monthly',
      interest: '5%',
      status: 'Active',
      progress: 60,
    },
    {
      id: 3,
      loanAmount: '₦400,000',
      collateralLocked: '₦200,000',
      repayableSchedule: 'Monthly',
      interest: '5%',
      status: 'Active',
      progress: 60,
    },
  ];

  const handleApplyForLoan = () => {
    console.log('Apply for RizeCoop Loan pressed');
    navigateTo('rizeCoopLoanForm');
  };

  const handleViewDetails = (loanId) => {
    console.log('View details for loan:', loanId);
    navigateTo('rizeCoopLoanDetails', { id: loanId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="RizeCoop Loan" onLeftPress={navigateBack} showLeftIcon={true} color="black" />
        
        <WalletCard
          walletName="RizeCoop Loan Wallet"
          balance="₦0.00"
          description="6% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#6B7C4E"
        />

        <View className="px-4">
          {/* Apply for RizeCoop Loan Button */}
          <TouchableOpacity
            onPress={handleApplyForLoan}
            className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold text-[#157196]">Apply for RizeCoop Loan</Text>
          </TouchableOpacity>

          {/* Loans List */}
          {loans.map((loan) => (
            <View
              key={loan.id}
              className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Money Stack Image */}
                <View className="mr-4 h-28 w-28 items-center justify-center">
                  <Image
                    source={require("../../../assets/image 52.png")}
                    style={{ width: 112, height: 112 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Loan Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Loan Amount: </Text>
                    {loan.loanAmount}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Collateral Locked: </Text>
                    {loan.collateralLocked}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Repayable Schedule: </Text>
                    {loan.repayableSchedule}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Interest: </Text>
                    {loan.interest}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{loan.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full bg-[#157196]"
                      style={{ width: `${loan.progress}%` }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {loan.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(loan.id)}
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