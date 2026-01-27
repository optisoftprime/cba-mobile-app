// screens/Action.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function Action() {
  const actions = [
    {
      id: 'logout',
      icon: 'log-out-outline',
      title: 'Log Out',
      subtitle: 'Log out your account',
      onPress: () => {
        // Handle logout
        console.log('Logging out');
      },
    },
    {
      id: 'deactivate',
      icon: 'close-circle-outline',
      title: 'Deactivate Account',
      subtitle: 'Deactivate your account',
      onPress: () => {
        // Handle deactivation
        console.log('Deactivating account');
      },
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Action"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={action.onPress}
            className="mb-4 flex-row items-center justify-between rounded-xl bg-gray-50 px-4 py-4"
            activeOpacity={0.7}>
            {/* Left Section - Icon and Text */}
            <View className="flex-1 flex-row items-center">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white">
                <Ionicons name={action.icon} size={20} color="#374151" />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-gray-900">
                  {action.title}
                </Text>
                <Text className="text-sm text-gray-500">{action.subtitle}</Text>
              </View>
            </View>

            {/* Right Arrow */}
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}