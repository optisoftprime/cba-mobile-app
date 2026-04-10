// screens/Profile.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { getUser } from 'config/storage';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    fetchUser();
  }, []);

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
    <View className="flex-1 bg-white">
      <Header
        title="Profile"
        onLeftPress={() => navigateBack()}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center bg-white px-4 py-6">
          <View className="relative mb-4">
            <View className="h-24 w-24 overflow-hidden rounded-full bg-gray-200">
              <Image
                source={require('../../assets/image 21.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-[#157196]"
              activeOpacity={0.8}>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="mb-1 text-xl font-bold text-gray-900">
            {user?.accountName ?? 'Sarah Adams'}
          </Text>

          <View className="mb-3 flex-row items-center">
            <Text className="mr-2 text-sm text-gray-600">
              Account No: {user?.accountNumber ?? '0987654321'}
            </Text>
            <Ionicons name="copy-outline" size={16} color="#6B7280" />
          </View>

          <View className="flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <Text className="mr-2 text-sm text-gray-700">Tier 1 Account</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-sm font-semibold text-[#157196]">Upgrade to Tier 2</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-4 px-4 gap-y-3">
          {menuItems.map((item) => (
            <View
              key={item.id}
              style={
                Platform.OS === 'android'
                  ? {
                    borderRadius: 16,
                    backgroundColor: 'white',
                    elevation: 2,
                    shadowColor: '#E5E7EB',
                  }
                  : {
                    borderRadius: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                  }
              }>
              <TouchableOpacity
                onPress={item.onPress}
                className="flex-row items-center rounded-2xl bg-white px-4 py-4"
                style={{
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                activeOpacity={0.7}>
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Ionicons name={item.icon} size={20} color="#374151" />
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-gray-900">{item.title}</Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {item.subtitle}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}