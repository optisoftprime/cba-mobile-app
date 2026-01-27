// screens/SecuritySettings.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function SecuritySettings() {
  const securityOptions = [
    {
      id: 'security_pin',
      icon: 'key-outline',
      title: 'Set/Change Security PIN',
      subtitle: 'Set and change you PIN',
      onPress: () => navigateTo('setSecurityPin'),
    },
    {
      id: 'biometrics',
      icon: 'finger-print-outline',
      title: 'Biometrics Login',
      subtitle: 'Turn on turn off your face ID',
      onPress: () => navigateTo('enableFaceId'),
    },
    {
      id: 'two_factor',
      icon: 'mail-outline',
      title: 'Two - Factor Authentication',
      subtitle: 'Set your 2 factor authentication',
      onPress: () => navigateTo('twoFa'),
    },
    {
      id: 'login_activity',
      icon: 'log-in-outline',
      title: 'Login Activity',
      subtitle: 'Control your login activity',
      onPress: () => navigateTo('loginActivity'),
    },
  ];

  return (
    <View className="flex-1">
      <Header
        title="Security Settings"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView 
        className="flex-1 px-2 "
        contentContainerStyle={{ paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        {/* Security Options */}
        <View className="bg-[white]">
          {securityOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.onPress}
              className={`flex-row items-center px-4 py-4  ${
                index !== securityOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              activeOpacity={0.7}>
              {/* Icon */}
              <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Ionicons name={option.icon} size={22} color="#374151" />
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-gray-900">{option.title}</Text>
                <Text className="text-xs text-gray-500">{option.subtitle}</Text>
              </View>

              {/* Arrow */}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}