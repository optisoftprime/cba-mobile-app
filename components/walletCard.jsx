import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function WalletBalanceCard({
  balance = '₦ 0.00',
  points = '0 Points',
  walletNumber = '',
  color = '#157196', // default from Figma
}) {
  const [hidden, setHidden] = useState(false);

  const handleToggleVisibility = () => {
    setHidden(!hidden);
  };

  const handleCopyWallet = async () => {
    if (walletNumber) {
      await Clipboard.setStringAsync(walletNumber);
      // Alert.alert('Copied!', 'Wallet number copied to clipboard');
    }
  };

  return (
    <View className="px-5 py-4">
      <View
        className="relative overflow-hidden rounded-2xl p-5"
        style={{
          backgroundColor: color,

          // ✅ Figma shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 4, // Android equivalent
        }}>
        {/* Gradient circles */}
        <View
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20"
          style={{ backgroundColor: '#ffffff' }}
        />
        <View
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full opacity-10"
          style={{ backgroundColor: '#ffffff' }}
        />

        {/* Header */}
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="rgba(255,255,255,0.25)" />
            <Text className="ml-2 text-sm text-white">Available Wallet Balance</Text>
          </View>
          <Text className="text-base font-bold text-white">{points}</Text>
        </View>

        {/* Balance */}
        <View className="flex-row items-center">
          <Text className="text-4xl font-bold text-white">{hidden ? '••••••••' : balance}</Text>
          <TouchableOpacity className="ml-3" onPress={handleToggleVisibility}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Wallet number */}
        <View className="ml-auto mt-4">
          <Text className="mb-1 text-right text-xs text-white/80">Wallet Number</Text>
          <View className="flex-row items-center">
            <Text className="text-base font-semibold text-white">{walletNumber}</Text>
            <TouchableOpacity className="ml-2" onPress={handleCopyWallet}>
              <Ionicons name="copy-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
