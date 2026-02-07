// components/WalletBalanceCard.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { Colors } from 'config/theme';

const WalletBalanceCard = ({
  // Content props
  walletName = 'RizeSpring Savings Wallet',
  balance = '₦0.00',
  description = 'Across 7 savings plans',
  points = '0 Points',
  walletNumber = '',

  // Styling props
  color = Colors?.primary || '#157196',
  backgroundImagePath = require('../assets/Vector .png'),

  // Visibility props (toggle which sections to show)
  showWalletName = true,
  showBalance = true,
  showBalanceToggle = true,
  showDescription = true,
  showDescriptionButton = true,
  showPoints = true,
  showWalletNumber = true,
  showCopyWallet = true,
  showTopRightButton = false,
  showBackgroundImage = true,

  // Top right button props
  topRightText,
  topRightAction,
  topRightIcon = 'account-balance-wallet',
  topRightIconSize = 14,

  // Callbacks
  onDescriptionPress,
  onCopyWallet,
  onToggleBalance,

  // Container styling
  containerClassName = 'mx-5 mb-8',
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const toggleBalanceVisibility = () => {
    const newVisibility = !isBalanceVisible;
    setIsBalanceVisible(newVisibility);
    setIsHidden(!newVisibility);
    onToggleBalance?.(newVisibility);
  };

  const handleCopyWallet = async () => {
    if (walletNumber) {
      await Clipboard.setStringAsync(walletNumber);
      onCopyWallet?.(walletNumber);
      Alert.alert('Copied!', 'Wallet number copied to clipboard');
    }
  };

  const displayBalance = isBalanceVisible ? balance : '••••••';

  return (
    <View className={containerClassName}>
      <View
        className="relative overflow-hidden rounded-2xl px-5 py-3"
        style={{
          backgroundColor: color,
          // Figma shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 4,
        }}>
        {/* Background Image (Optional) */}
        {showBackgroundImage && backgroundImagePath && (
          <Image
            source={backgroundImagePath}
            className="absolute bottom-0 right-0 opacity-30"
            style={{ width: 150, height: 120 }}
          />
        )}

        {/* Gradient circles */}
        <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-20" />
        <View className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10" />

        {/* Top Right Button (Optional) */}
        {showTopRightButton && topRightText && topRightAction && (
          <TouchableOpacity
            onPress={topRightAction}
            className="absolute right-4 top-4 flex-row items-center rounded-full bg-white px-3 py-2">
            <MaterialIcons name={topRightIcon} size={topRightIconSize} color={color} />
            <Text className="ml-1 text-xs font-semibold" style={{ color: color }}>
              {topRightText}
            </Text>
          </TouchableOpacity>
        )}

        {/* Wallet Name (Optional) */}
        {showWalletName && (
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={18} color="rgba(255,255,255,0.25)" />
              <Text className="ml-2 text-sm text-white">{walletName}</Text>
            </View>

            {/* Points (Optional) */}
            {showPoints && <Text className="text-base font-bold text-white">{points}</Text>}
          </View>
        )}

        {/* Balance Section */}
        {showBalance && (
          <View className="mb-4 flex-row items-center justify-start gap-5">
            <Text className="text-4xl font-bold text-white">
              {isHidden ? '••••••••' : displayBalance}
            </Text>

            {/* Balance Toggle (Optional) */}
            {showBalanceToggle && (
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Ionicons name={isHidden ? 'eye-off' : 'eye'} size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Description Button (Optional) */}
        {showDescription && showDescriptionButton && (
          <TouchableOpacity
            className="self-start rounded-full bg-white px-4 py-2"
            onPress={onDescriptionPress}>
            <Text className="text-xs font-semibold text-gray-800">{description}</Text>
          </TouchableOpacity>
        )}

        {/* Description Text only (Optional) */}
        {showDescription && !showDescriptionButton && (
          <Text className="mt-2 text-sm text-white/90">{description}</Text>
        )}

        {/* Wallet Number Section (Optional) */}
        {showWalletNumber && walletNumber && (
          <View className="mt-42 ml-auto">
            <Text className="mb-1 text-right text-xs text-white/80">Account Number</Text>
            <View className="flex-row items-center justify-end">
              <Text className="text-base font-semibold text-white">{walletNumber}</Text>

              {/* Copy Button (Optional) */}
              {showCopyWallet && (
                <TouchableOpacity className="ml-2" onPress={handleCopyWallet}>
                  <Ionicons name="copy-outline" size={18} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletBalanceCard;
