// screens/TransactionReceipt.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { navigateBack } from 'app/navigate';
import { Curves } from 'svgs/transactionReceiptCurve';

export default function TransactionReceipt() {
  const receiptData = {
    senderName: 'John Dave',
    senderBankName: 'RizeSpring',
    senderAccountNumber: '09087654321',
    recipientName: 'Abraham Daalson',
    recipientBankName: 'Zenith Bank',
    recipientAccountNumber: '0987654321',
    amountSent: '₦34,500.00',
    transactionDateTime: '23/09/2026  09:10:AM',
    transactionId: '2456787653427B983',
    narration: 'Upkeep',
  };

  const handleDownload = () => {
    console.log('Download receipt');
  };

  const handleShare = () => {
    console.log('Share receipt');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#157196' }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header Wave Design */}
        <View className="items-center pb-4 pt-8">
          {/* App Logo */}
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-white">
            <Image
              source={require('../../assets/onboardingImage.png')}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>

          <Text className="text-2xl font-bold text-white">Transaction Receipt</Text>
          <Text className="mt-1 text-sm text-white opacity-90">August 24, 2024 09:45:32</Text>
        </View>

        {/* Top Curves */}
        <View>
          <Curves />
        </View>

        {/* Receipt Details */}
        <View className="flex-1 bg-white px-5 pb-6">
          {/* Transaction Details */}
          <View className="space-y-3">
            <ReceiptRow label="Sender's Name" value={receiptData.senderName} />
            <ReceiptRow label="Sender's Bank Name" value={receiptData.senderBankName} />
            <ReceiptRow label="Sender's Account Number" value={receiptData.senderAccountNumber} />
            <ReceiptRow label="Recipient's Name" value={receiptData.recipientName} />
            <ReceiptRow label="Recipient's Bank Name" value={receiptData.recipientBankName} />
            <ReceiptRow
              label="Recipient's Account Number"
              value={receiptData.recipientAccountNumber}
            />
            <ReceiptRow label="Amount Sent" value={receiptData.amountSent} />
            <ReceiptRow label="Transaction Date/Time" value={receiptData.transactionDateTime} />
            <ReceiptRow label="Transaction ID" value={receiptData.transactionId} />
            <ReceiptRow label="Narration" value={receiptData.narration} />
          </View>
        </View>

        {/* Bottom Curves - Rotated 180 degrees */}
        <View style={{ transform: [{ rotate: '180deg' }] }}>
          <Curves />
        </View>

        {/* Action Buttons */}
        <View className="px-5 pb-6 pt-4" style={{ backgroundColor: '#157196' }}>
          <TouchableOpacity
            onPress={handleDownload}
            className="mb-3 items-center rounded-lg bg-white py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold" style={{ color: '#157196' }}>
              Download
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="items-center rounded-lg border-2 border-white py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Helper component for receipt rows
function ReceiptRow({ label, value }) {
  return (
    <View className="flex-row justify-between py-2">
      <Text className="flex-1 text-sm text-gray-600">{label}</Text>
      <Text className="flex-1 text-right text-sm font-semibold" style={{ color: '#157196' }}>
        {value}
      </Text>
    </View>
  );
}
