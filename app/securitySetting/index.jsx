// screens/SecuritySettings.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function SecuritySettings() {
  const securityOptions = [
    {
      id: 'security_pin',
      icon: 'key-outline',
      title: 'Set/Change Security PIN',
      subtitle: 'Set and change your PIN',
      onPress: () => navigateTo('setUserPin'),
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
    <View className="flex-1 bg-white">
      <Header
        title="Self Service"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        <View className="gap-y-3">
          {securityOptions.map((option) => (
            <View
              key={option.id}
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
                onPress={option.onPress}
                className="flex-row items-center rounded-2xl bg-white px-4 py-4"
                style={{
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                activeOpacity={0.7}>
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Ionicons name={option.icon} size={22} color="#374151" />
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-gray-900">{option.title}</Text>
                  <Text className="text-xs text-gray-500">{option.subtitle}</Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}