// screens/FixedDepositList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard'; // Updated import
import { Colors } from 'config/theme';

export default function FixedDepositList() {
  const deposits = [
    {
      id: 1,
      depositAmount: '₦100,000',
      startDate: '02/05/2025',
      maturityDate: '12/09/2026',
      interest: '10%',
      status: 'Active',
      progress: 85,
    },
    {
      id: 2,
      depositAmount: '₦100,000',
      startDate: '02/05/2025',
      maturityDate: '12/09/2026',
      interest: '10%',
      status: 'Active',
      progress: 85,
    },
  ];

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
  };

  const handleCreateFixedDeposit = () => {
    console.log('Create Fixed Deposit pressed');
    navigateTo('fixedDepositForm');
  };

  const handleViewDetails = (depositId) => {
    console.log('View details for deposit:', depositId);
    navigateTo('fixedDepositDetails', { id: depositId });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Fixed Deposit" onLeftPress={navigateBack} showLeftIcon={true} />

        {/* Updated WalletBalanceCard */}
        <WalletBalanceCard
          walletName="Fixed Deposit Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#2E5423"
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
          {/* Create Fixed Deposits Button */}
          <TouchableOpacity onPress={handleCreateFixedDeposit} className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold" style={{ color: Colors?.primary }}>
              Create Fixed Deposits
            </Text>
          </TouchableOpacity>

          {/* Deposits List */}
          {deposits.map((deposit) => (
            <View
              key={deposit.id}
              className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
              <View className="flex-row">
                {/* Lock Image/Icon */}
                <View className="mr-4 h-28 w-28 items-center justify-center rounded-xl bg-gray-800">
                  <Image
                    source={require('../../../assets/Frame 427320095.png')}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Deposit Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Deposit Amount: </Text>
                    {deposit.depositAmount}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Start Date: </Text>
                    {deposit.startDate}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Maturity Date: </Text>
                    {deposit.maturityDate}
                  </Text>
                  <Text className="mb-1 text-xs text-gray-600">
                    <Text className="font-semibold">Interest: </Text>
                    {deposit.interest}
                  </Text>
                  <Text className="mb-2 text-xs text-gray-600">
                    <Text className="font-semibold">Status: </Text>
                    <Text className="text-green-600">{deposit.status}</Text>
                  </Text>

                  {/* Progress Bar */}
                  <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <View
                      className="h-full bg-[#157196]"
                      style={{ width: `${deposit.progress}%`, backgroundColor: Colors?.primary }}
                    />
                  </View>
                  <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                    {deposit.progress}%
                  </Text>

                  {/* View Details Button */}
                  <TouchableOpacity
                    onPress={() => handleViewDetails(deposit.id)}
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
