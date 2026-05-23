// components/homeWalletCard.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Colors } from 'config/theme';
import Toast from 'react-native-toast-message';

const HomeWalletCard = ({
  balance = '₦ --',
  points = '0 Points',
  accountNumber = '----------',
  accountTier = 'Tier 1 Account',
  upgradeLabel = null,
  onUpgradePress,
  color = Colors?.primary || '#157196',
  backgroundImagePath = require('../assets/image 17.png'),
  containerClassName = 'px-5 py-3',
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const handleCopy = async () => {
    if (accountNumber && accountNumber !== '----------') {
      await Clipboard.setStringAsync(accountNumber);
      Toast.show({ type: 'success', text1: 'Copied!', text2: 'Account number copied to clipboard' });
    }
  };

  const displayBalance = isBalanceVisible ? balance : '••••••••';

  return (
    <View className={containerClassName}>
      <View
        className="relative overflow-hidden rounded-2xl px-5 py-3"
        style={{
          backgroundColor: color,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 4,
        }}>

        {/* Full Background Image — centered, contained */}
        {backgroundImagePath && (
          <Image
            source={backgroundImagePath}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              opacity: 0.25,
            }}
            resizeMode="contain"
          />
        )}

        {/* Row 1: Wallet label + Points */}
        <View className="mb-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="checkmark-circle" size={16} color="rgba(255,255,255,0.6)" />
            <Text className="ml-2 text-sm text-white">Available Wallet Balance</Text>
          </View>
          <Text className="text-sm font-bold text-white">{points}</Text>
        </View>

        {/* Row 2: Balance + Eye toggle */}
        <View className="mb-3 flex-row items-center gap-3">
          <Text className="text-4xl font-bold text-white">{displayBalance}</Text>
          <TouchableOpacity onPress={() => setIsBalanceVisible((v) => !v)}>
            <Ionicons name={isBalanceVisible ? 'eye' : 'eye-off'} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Row 3: Tier + Account Number */}
        <View className="flex-row items-center justify-between">
          {/* Left: Tier label + Upgrade button (hidden at tier 3+) */}
          <View className="flex-row items-center gap-2">
            <Text className="text-xs text-white/80">{accountTier}</Text>
            {upgradeLabel && onUpgradePress && (
              <TouchableOpacity
                onPress={onUpgradePress}
                className="rounded-full bg-white px-3 py-1">
                <Text className="text-xs font-semibold" style={{ color }}>
                  {upgradeLabel}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Right: Account Number + Copy */}
          <View className="items-end">
            <Text className="mb-1 text-xs text-white/70">Account Number</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-semibold text-white">{accountNumber}</Text>
              <TouchableOpacity onPress={handleCopy}>
                <Ionicons name="copy-outline" size={15} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeWalletCard;