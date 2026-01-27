import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import WalletBalanceCard from 'components/walletCard';

export default function TargetSavingsForm() {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [interestRate] = useState('5%');
  const [autoDebit, setAutoDebit] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [frequencyModal, setFrequencyModal] = useState(false);

  const frequencyOptions = ['Daily', 'Weekly', 'Monthly'];

  const handleContinue = () => {
    // console.log('Target Savings Form Submitted:', {
    //   goalName,
    //   targetAmount,
    //   frequency,
    //   startDate,
    //   interestRate,
    //   autoDebit,
    //   understood,
    // });
    navigateTo('savingSummary');
  };

  const handleSavingsPlansPress = () => {
    // Navigate to view all savings plans if needed
    // router.push('/savings/all-plans');
    // navigateTo("savingSummary")
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Target Savings"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Target Savings Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          color="#B4872A" // yellow-600 equivalent
          backgroundImagePath={require('../../../assets/Vector .png')}
          onDescriptionPress={handleSavingsPlansPress}
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

        {/* Form Content */}
        <View className="flex-1 px-5">
          {/* Wallet Card - Using the reusable component */}

          {/* Goal Name Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Goal Name</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={goalName}
              onChangeText={setGoalName}
              placeholder="Enter goal name e.g. fees, rent"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Target Amount Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Target Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={targetAmount}
              onChangeText={setTargetAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Contribution Frequency */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Contribution Frequency</Text>
            <TouchableOpacity
              onPress={() => setFrequencyModal(true)}
              className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
              <Text className={frequency ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
                {frequency || 'Select Frequency'}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color="#9CA3AF"
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          </View>

          {/* Frequency Modal */}
          <Modal visible={frequencyModal} transparent animationType="fade">
            <View className="flex-1 justify-end bg-black/50">
              <View className="rounded-t-2xl bg-white p-4">
                <FlatList
                  data={frequencyOptions}
                  keyExtractor={(item) => item}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setFrequency(item);
                        setFrequencyModal(false);
                      }}
                      className="border-b border-gray-200 py-4">
                      <Text className="text-base text-gray-900">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setFrequencyModal(false)}
                  className="items-center py-4">
                  <Text className="text-base font-semibold text-blue-600">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Start Date Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Start Date</Text>
            <View className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 ">
              <TextInput
                className="flex-1 text-base text-gray-900"
                value={startDate}
                onChangeText={setStartDate}
                placeholder="Select start date"
                placeholderTextColor="#9CA3AF"
              />
              <Ionicons name="calendar" size={20} color={Colors?.primary} />
            </View>
          </View>

          {/* Interest Rate */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Interest Rate</Text>
            <View className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-3">
              <Text className="text-base font-semibold text-gray-900">{interestRate}</Text>
            </View>
          </View>

          {/* Auto Debit Toggle */}
          <View className="mb-6 flex-row items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
            <Text className="text-sm font-semibold text-gray-900">Auto Debit</Text>
            <Switch
              value={autoDebit}
              onValueChange={setAutoDebit}
              trackColor={{ false: '#D1D5DB', true: Colors?.secondary }}
              thumbColor={autoDebit ? Colors?.primary : '#F3F4F6'}
            />
          </View>

          {/* Lock Rules Section */}
          <View className="mb-6 rounded-lg bg-blue-100 p-4">
            <Text className="mb-3 font-semibold text-gray-900">Lock Rules:</Text>
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
                borderColor: understood ? Colors?.primary : Colors?.secondary,
                backgroundColor: understood ? Colors?.primary : 'transparent',
              }}>
              {understood && <Ionicons name="checkmark" size={16} color="white" />}
            </TouchableOpacity>

            <Text className="ml-3 text-sm" style={{ color: Colors?.secondary }}>
              I understand, I can't withdraw early
            </Text>
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold "
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
