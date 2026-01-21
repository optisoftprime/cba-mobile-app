// screens/WalletToWalletTransfer.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function WalletToWalletTransfer() {
  const [walletNumber, setWalletNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [isValidRecipient, setIsValidRecipient] = useState(false);

  const handleWalletNumberChange = (text) => {
    setWalletNumber(text);
    
    // Simulate wallet number validation
    if (text.length >= 10) {
      setRecipientName('Abraham Mclawdon David');
      setIsValidRecipient(true);
    } else {
      setRecipientName('');
      setIsValidRecipient(false);
    }
  };

  const handleContinue = () => {
    // console.log('Transfer details:', {
    //   walletNumber,
    //   recipientName,
    //   amount,
    //   narration,
    // });
    navigateTo('setInternalTransferPin');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Wallet to Wallet"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Recipient Wallet Number */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Recipient Wallet Number
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={walletNumber}
              onChangeText={handleWalletNumberChange}
              placeholder="Enter recipient wallet number"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          {/* Recipient Name Display */}
          {isValidRecipient && (
            <View className="mb-4 flex-row items-center">
              <Text className="text-sm font-medium text-green-600">{recipientName}</Text>
              <View className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-green-600">
                <Text className="text-xs font-bold text-white">✓</Text>
              </View>
            </View>
          )}

          {/* Amount */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Amount</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={amount}
              onChangeText={setAmount}
              placeholder="₦0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>

          {/* Narration */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Narration</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={narration}
              onChangeText={setNarration}
              placeholder="Enter narration"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={{ minHeight: 100 }}
            />
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-4 pb-6">
          <TouchableOpacity
            onPress={handleContinue}
            className="items-center rounded-lg bg-[#157196] py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}