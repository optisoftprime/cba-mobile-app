// components/EmptyState.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * EmptyState
 *
 * Props:
 *  - title      : string — main heading
 *  - subtitle   : string — supporting text below title
 *  - iconName   : string — Ionicons name (default: 'file-tray-outline')
 *  - iconSize   : number — icon size (default: 48)
 *  - iconColor  : string — icon color (default: '#9CA3AF')
 */
export default function EmptyState({
  title = 'Nothing here yet',
  subtitle,
  iconName = 'file-tray-outline',
  iconSize = 48,
  iconColor = '#9CA3AF',
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <Text className="mt-4 text-center text-base font-semibold text-gray-500">{title}</Text>
      {subtitle ? <Text className="mt-1 text-center text-sm text-gray-400">{subtitle}</Text> : null}
    </View>
  );
}
