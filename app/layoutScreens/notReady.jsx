// screens/ScreenNotReady.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function ScreenNotReady({ route }) {
  const screenName = route?.params?.screenName || 'This Screen';

  return (
    <View className="flex-1 bg-white">
      <Header title={screenName} onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <View className="flex-1 items-center justify-center px-6">
        {/* Icon */}
        <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <Ionicons name="construct-outline" size={48} color="#9CA3AF" />
        </View>

        {/* Title */}
        <Text className="mb-3 text-center text-2xl font-bold text-gray-900">
          Screen Not Ready Yet
        </Text>

        {/* Description */}
        <Text className="mb-8 text-center text-base text-gray-600">
          This feature is currently under development. We're working hard to bring it to you soon!
        </Text>

        {/* Back Button */}
        <TouchableOpacity
          onPress={navigateBack}
          className="w-full max-w-xs rounded-lg px-6 py-4"
          activeOpacity={0.8}
          style={{ backgroundColor: Colors?.primary }}>
          <Text className="text-center text-base font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
