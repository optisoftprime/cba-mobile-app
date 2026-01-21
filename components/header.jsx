// components/Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateBack } from 'app/navigate';

export default function Header({
  title = 'Title',
  color = '#157196',
  size = 'text-2xl',
  subtitle = null,
  containerStyle = {},
  // Left side props
  leftIcon = 'arrow-back',
  leftIconSize = 24,
  leftIconColor = '#000',
  onLeftPress = () => navigateBack(),
  showLeftIcon = true,
  // Right side props
  rightIcon = null,
  rightIconSize = 24,
  rightIconColor = '#000',
  onRightPress = () => console.log('Right icon pressed'),
  showRightIcon = false,
}) {
  return (
    <View className="mt-2 px-5 pb-6 pt-12" style={containerStyle}>
      {/* Header Row with Left Icon, Centered Title, and Right Icon */}
      <View className="relative flex-row items-start justify-center">
        {/* Left Icon - Absolute positioned on left */}
        {showLeftIcon && (
          <TouchableOpacity
            onPress={onLeftPress}
            className="absolute left-0"
            activeOpacity={0.7}
            style={{ zIndex: 10 }}>
            <Ionicons name={leftIcon} size={leftIconSize} color={leftIconColor} />
          </TouchableOpacity>
        )}

        {/* Centered Title - With padding to prevent overlap with icons */}
        <View className="flex-1 px-10">
          <Text
            className={`${size} text-center font-bold`}
            style={{ color, lineHeight: 28 }}
            numberOfLines={2}>
            {title}
          </Text>
        </View>

        {/* Right Icon - Absolute positioned on right */}
        {showRightIcon && rightIcon && (
          <TouchableOpacity
            onPress={onRightPress}
            className="absolute right-0"
            activeOpacity={0.7}
            style={{ zIndex: 10 }}>
            <Ionicons name={rightIcon} size={rightIconSize} color={rightIconColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* Subtitle - Centered */}
      {subtitle && (
        <Text className="mt-5 px-4 text-center text-sm leading-5 text-gray-600">{subtitle}</Text>
      )}
    </View>
  );
}
