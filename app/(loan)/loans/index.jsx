// screens/LoanList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletCard from 'components/walletBox';

export default function LoanList() {
  const loans = [
    {
      id: 1,
      amountApproved: '₦50,000',
      tenure: '6 Months',
      interestRate: '5%',
      totalPayable: '5%',
      monthlyRepayment: '5%',
      status: 'Approved',
      progress: 65,
    },
    {
      id: 2,
      amountApproved: '₦50,000',
      tenure: '6 Months',
      interestRate: '5%',
      totalPayable: '5%',
      monthlyRepayment: '5%',
      status: 'Approved',
      progress: 65,
    },
  ];

  const handleApplyNewLoan = () => {
    // console.log('Apply for a New Loan pressed');
    // navigateTo('loanApplicationForm');
  };

  const handleViewDetails = (loanId) => {
    // console.log('View details for loan:', loanId);
    // navigateTo('loanDetails', { id: loanId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Loan" onLeftPress={navigateBack} showLeftIcon={true} />
        <WalletCard
          walletName="Loan Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#4C1D95"
        />

        <View className="px-4">
          {/* Wallet Card */}

          {/* Apply for a New Loan Button */}
          <TouchableOpacity onPress={handleApplyNewLoan} className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold text-[#157196]">Apply for a New Loan</Text>
          </TouchableOpacity>

          {/* Loans List */}
          {loans.map((loan) => (
            <View key={loan.id} className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Money Image */}
                <View className="mr-4 h-28 w-28 items-center justify-center overflow-hidden rounded-xl">
                  <Image
                    source={require('../../../assets/Frame 427320095.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Loan Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Amount Approved: </Text>
                    {loan.amountApproved}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Tenure: </Text>
                    {loan.tenure}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Interest Rate: </Text>
                    {loan.interestRate}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Total Payable: </Text>
                    {loan.totalPayable}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Monthly Repayment: </Text>
                    {loan.monthlyRepayment}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{loan.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View className="h-full bg-[#157196]" style={{ width: `${loan.progress}%` }} />
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
