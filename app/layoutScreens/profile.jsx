// screens/Profile.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const menuItems = [
    {
      id: 'profile_settings',
      icon: 'person-outline',
      title: 'Profile Settings',
      subtitle: 'Edit and make changes to your profile',
      onPress: () => navigateTo('profileSettings'),
    },
    {
      id: 'linked_accounts',
      icon: 'wallet-outline',
      title: 'Linked Accounts and Wallets',
      subtitle: 'View your wallet balance, linked account',
      // onPress: () => navigateTo('linkedAccounts'),
    },
    {
      id: 'security',
      icon: 'lock-closed-outline',
      title: 'Security Settings',
      subtitle: 'Set your security PIN for your account',
      onPress: () => navigateTo('securitySetting'),
    },
    {
      id: 'app_settings',
      icon: 'grid-outline',
      title: 'App Settings',
      subtitle: 'Push SMS, emails, notification preferen...',
      onPress: () => navigateTo('appSettings'),
    },
    {
      id: 'support',
      icon: 'help-circle-outline',
      title: 'Support & Legal',
      subtitle: 'Contact support, live chat/Ticket',
      onPress: () => navigateTo('support'),
    },
    {
      id: 'kyc',
      icon: 'person-add-outline',
      title: 'KYC Update',
      subtitle: 'Upgrade your account from tiers',
      onPress: () => navigateTo('upgradeAccount'),
    },
    {
      id: 'rewards',
      icon: 'gift-outline',
      title: 'Rewards',
      subtitle: 'Earn points for positive finance habits',
      onPress: () => navigateTo('rewards'),
    },
    {
      id: 'actions',
      icon: 'exit-outline',
      title: 'Actions',
      subtitle: 'Log out, Deactivate account',
      onPress: () => navigateTo('settingsAction'),
    },
  ];

  return (
    <View className="flex-1">
      <Header
        title="Profile"
        onLeftPress={() => {
          navigateTo('appLayout', { screen: 'Home' });
        }}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center bg-white px-4 py-6">
          {/* Profile Picture */}
          <View className="relative mb-4">
            <View className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
              <Image
                source={require('../../assets/image 21.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            {/* Edit Icon */}
            <TouchableOpacity
              className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-[#157196]"
              activeOpacity={0.8}>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Name */}
          <Text className="mb-1 text-xl font-bold text-gray-900">Sarah Adams</Text>

          {/* Account Number */}
          <View className="mb-3 flex-row items-center">
            <Text className="mr-2 text-sm text-gray-600">Account No: 0987654321</Text>
            <Ionicons name="copy-outline" size={16} color="#6B7280" />
          </View>

          {/* Tier Badge */}
          <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <Text className="mr-2 text-sm text-gray-700">Tier 1 Account</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm font-semibold text-[#157196]">Upgrade to Tier 2</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-4 bg-white px-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className={`flex-row items-center py-4 ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              activeOpacity={0.7}>
              {/* Icon */}
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Ionicons name={item.icon} size={20} color="#374151" />
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-gray-900">{item.title}</Text>
                <Text className="text-xs text-gray-500" numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>

              {/* Arrow */}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}
