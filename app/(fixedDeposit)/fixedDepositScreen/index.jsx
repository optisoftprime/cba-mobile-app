// screens/FixedDepositForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TenureModal from './modal/tenureModal';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';

export default function FixedDepositForm() {
  const [amountToDeposit, setAmountToDeposit] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureModal, setTenureModal] = useState(false);
  const [understood, setUnderstood] = useState(false);

  const tenureOptions = [
    { label: '30 Days', value: '30' },
    { label: '90 Days', value: '90' },
    { label: '180 Days', value: '180' },
    { label: '12 Months', value: '365' },
  ];

  const interestRate = '12%';

  const calculateEarnings = () => {
    if (!amountToDeposit || !tenure) return '₦0';
    const amount = parseFloat(amountToDeposit.replace(/,/g, ''));
    const days = parseInt(tenure);
    const rate = 0.12; // 12% annual rate
    const earnings = (amount * rate * days) / 365;
    return `₦${earnings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const handleContinue = () => {
    // if (!amountToDeposit || !tenure || !understood) {
    //   console.log('Please fill all required fields and accept terms');
    //   return;
    // }
    // console.log('Fixed Deposit Form Submitted:', {
    //   amountToDeposit,
    //   tenure,
    //   interestRate,
    // });
    navigateTo('deposits');
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Fixed Deposit" onLeftPress={navigateBack} showLeftIcon={true} />
        <WalletBalanceCard
          walletName="Fixed Deposit Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#2E5423"
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

        <View className="flex-1 px-5">
          {/* Amount to Deposit Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Amount to Deposit</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={amountToDeposit}
              onChangeText={setAmountToDeposit}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Tenure Dropdown */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Tenure</Text>
            <TouchableOpacity
              onPress={() => setTenureModal(true)}
              className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className={tenure ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
                {tenure ? tenureOptions.find((t) => t.value === tenure)?.label : 'Select duration'}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color="#9CA3AF"
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          </View>

          {/* You will Earn */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">You will Earn</Text>
            <View className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">{calculateEarnings()}</Text>
            </View>
          </View>

          {/* Interest Rate */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Interest Rate</Text>
            <View className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">{interestRate}</Text>
            </View>
          </View>

          {/* Fixed Deposit Rules Section */}
          <View className="mb-6 rounded-lg bg-blue-100 p-4">
            <Text className="mb-3 font-semibold text-gray-900">Fixed Deposit Rules:</Text>
            <Text className="mb-2 text-sm text-gray-700">• No withdrawals before unlock</Text>
            <Text className="text-sm text-gray-700">
              • There shall be penalty charge of 5% if any occurs
            </Text>
          </View>

          {/* Checkbox */}
          <View className="mb-8 flex-row items-center">
            <TouchableOpacity
              onPress={() => setUnderstood(!understood)}
              className="h-5 w-5 items-center justify-center rounded border-2"
              style={{
                borderColor: understood ? Colors?.primary : '#000000',
                backgroundColor: understood ? Colors?.primary : 'transparent',
              }}>
              {understood && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>

            <Text className="ml-3 text-sm text-gray-800">I understand, I can't withdraw early</Text>
          </View>
        </View>

        {/* Continue Button */}
        <View className="px-5 pb-2">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>

        {/* Cancel Button */}
        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleCancel}
            label="Cancel"
            backgroundColor="white"
            borderColor={Colors?.primary}
            borderWidth={2}
            textColor={Colors?.primary}
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>

      {/* Tenure Modal */}
      <TenureModal
        visible={tenureModal}
        onClose={() => setTenureModal(false)}
        tenure={tenure}
        setTenure={setTenure}
        tenureOptions={tenureOptions}
      />
    </View>
  );
}
