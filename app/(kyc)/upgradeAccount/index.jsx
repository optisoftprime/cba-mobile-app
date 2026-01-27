// screens/UpgradeAccount.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function UpgradeAccount() {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1',
      price: '₦50,000.00',
      frequency: 'monthly',
      isActive: true,
    },
    {
      id: 2,
      name: 'Tier 2',
      price: '₦500,000.00',
      frequency: 'monthly',
      isActive: false,
      link:"upgradeTwo"
    },
    {
      id: 3,
      name: 'Tier 3',
      description: 'Unlimited access',
      isActive: false,
    },
  ];

  const handleUpgrade = (tier) => {
   if(tier?.link){
    navigateTo(tier?.link)
   }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Upgrade your Account"
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {tiers.map((tier, index) => (
          <View
            key={tier.id}
            className={`mb-4 flex-row items-center justify-between rounded-2xl bg-gray-50 px-5 py-5 ${
              index === tiers.length - 1 ? 'opacity-60' : ''
            }`}>
            {/* Left Section - Tier Info */}
            <View className="flex-1 flex-row items-center">
              <Text
                className={`mr-3 text-base font-medium ${
                  index === tiers.length - 1 ? 'text-gray-400' : 'text-gray-900'
                }`}>
                {tier.name}
              </Text>
              {tier.price ? (
                <Text className="text-base" style={{ color: Colors.primary }}>
                  {tier.price} <Text style={{ color: Colors.primary }}>{tier.frequency}</Text>
                </Text>
              ) : (
                <Text className="text-base text-[#60A5FA]">{tier.description}</Text>
              )}
            </View>

            {/* Right Section - Status/Button */}
            {tier.isActive ? (
              <View className="h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: Colors.primary }}>
                <Ionicons name="checkmark" size={14} color="white" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleUpgrade(tier)}
                className="rounded-lg bg-[#86EFAC] px-5 py-1.5"
                activeOpacity={0.8}>
                <Text className="text-sm font-medium text-[#16A34A]">Upgrade</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}