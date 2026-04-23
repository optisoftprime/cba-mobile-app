// components/WalletBalanceCard.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Animated } from 'react-native';
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
  referralCount = null,

  // Styling props
  color = Colors?.primary || '#157196',
  backgroundImagePath = require('../assets/Vector .png'),
  moneyImagePath = null,

  // Visibility props
  showWalletName = true,
  showBalance = true,
  showBalanceToggle = true,
  showDescription = true,
  showDescriptionButton = true,
  showPoints = true,
  showWalletNumber = true,
  showCopyWallet = true,
  showTopRightButton = false,
  showTopRightBadge = false,
  showBackgroundImage = true,
  showMoneyImage = false,
  showShareButton = false,
  showWithdrawButton = false, // New: for withdraw button inside card

  // Top right button/badge props
  topRightText,
  topRightAction,
  topRightIcon = 'account-balance-wallet',
  topRightIconSize = 14,

  // Withdraw button props
  withdrawText = 'Withdraw',
  onWithdraw,

  // Callbacks
  onDescriptionPress,
  onCopyWallet,
  onToggleBalance,
  onShareWallet,

  // Container styling
  containerClassName = 'mx-5 mb-8',
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  // Animation values for floating circles
  const topRightX = new Animated.Value(0);
  const topRightY = new Animated.Value(0);
  const bottomLeftX = new Animated.Value(0);
  const bottomLeftY = new Animated.Value(0);

  // Start animations on mount
  useEffect(() => {
    // Top right circle X animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(topRightX, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(topRightX, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Top right circle Y animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(topRightY, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(topRightY, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Bottom left circle X animation (offset for variety)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomLeftX, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.timing(bottomLeftX, {
          toValue: 0,
          duration: 3200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Bottom left circle Y animation (offset for variety)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomLeftY, {
          toValue: 1,
          duration: 3800,
          useNativeDriver: true,
        }),
        Animated.timing(bottomLeftY, {
          toValue: 0,
          duration: 3800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

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
      // Alert.alert('Copied!', 'Wallet number copied to clipboard');
    }
  };

  const handleShareWallet = () => {
    if (onShareWallet) {
      onShareWallet(walletNumber);
    }
  };

  const displayBalance = isBalanceVisible ? balance : '••••••';

  return (
    <View className={containerClassName}>
      <View
        className="relative overflow-hidden rounded-2xl px-5 py-4"
        style={{
          backgroundColor: color,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 4,
        }}>
        {/* Background Image (Optional) */}
        {showBackgroundImage && backgroundImagePath && !showMoneyImage && (
          <Image
            source={backgroundImagePath}
            className="absolute bottom-0 right-0 opacity-30"
            style={{ width: 150, height: 120 }}
          />
        )}

        {/* Money Image (Optional) */}
        {showMoneyImage && moneyImagePath && (
          <Image
            source={moneyImagePath}
            className="absolute bottom-0 right-0"
            style={{ width: 180, height: 160 }}
            resizeMode="contain"
          />
        )}

        {/* Gradient circles with floating animation */}
        <Animated.View
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-20"
          style={{
            transform: [
              {
                translateX: topRightX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
              {
                translateY: topRightY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          }}
        />
        <Animated.View
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white opacity-10"
          style={{
            transform: [
              {
                translateX: bottomLeftX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
              {
                translateY: bottomLeftY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                }),
              },
            ],
          }}
        />

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

        {/* Top Right Badge (for "3 Referrals") */}
        {showTopRightBadge && referralCount !== null && (
          <View className="absolute right-4 top-4 rounded-full bg-white px-3 py-2">
            <Text className="text-xs font-semibold" style={{ color: color }}>
              {referralCount} {referralCount === 1 ? 'Referral' : 'Referrals'}
            </Text>
          </View>
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
          <View className="mb-4 flex-row items-center justify-start gap-3">
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

        {/* Bottom Section with Wallet Number and Withdraw */}
        <View className="flex-row items-center justify-between gap-2">
          {/* Wallet Number with Copy and Share */}
          {showWalletNumber && walletNumber && (
            <View className="flex-row items-center rounded-full bg-white px-4 py-2">
              <Text className="mr-2 text-xs font-semibold text-gray-800">{walletNumber}</Text>

              {/* Copy Button */}
              {showCopyWallet && (
                <TouchableOpacity onPress={handleCopyWallet} className="mr-2">
                  <Ionicons name="copy-outline" size={16} color={color} />
                </TouchableOpacity>
              )}

              {/* Share Button */}
              {showShareButton && (
                <TouchableOpacity onPress={handleShareWallet}>
                  <Ionicons name="share-social-outline" size={16} color={color} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Withdraw Button */}
          {showWithdrawButton && onWithdraw && (
            <TouchableOpacity
              onPress={onWithdraw}
              className="flex-row items-center rounded-lg border-2 border-white bg-transparent px-4 py-2">
              <MaterialIcons name="account-balance-wallet" size={16} color="white" />
              <Text className="ml-1 text-xs font-semibold text-white">{withdrawText}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Description Button (Optional) */}
        {showDescription && showDescriptionButton && (
          <TouchableOpacity
            className="mt-3 self-start rounded-full bg-white px-4 py-2"
            onPress={onDescriptionPress}>
            <Text className="text-xs font-semibold text-gray-800">{description}</Text>
          </TouchableOpacity>
        )}

        {/* Description Text only (Optional) */}
        {showDescription && !showDescriptionButton && !showWalletNumber && (
          <Text className="mt-2 text-sm text-white/90">{description}</Text>
        )}

        {/* Old Wallet Number Section (for backward compatibility) */}
        {showWalletNumber &&
          walletNumber &&
          !showWithdrawButton &&
          !showShareButton &&
          !showCopyWallet && (
            <View className="ml-auto mt-4">
              <Text className="mb-1 text-right text-xs text-white/80">Account Number</Text>
              <View className="flex-row items-center justify-end">
                <Text className="text-base font-semibold text-white">{walletNumber}</Text>
              </View>
            </View>
          )}
      </View>
    </View>
  );
};

export default WalletBalanceCard;
