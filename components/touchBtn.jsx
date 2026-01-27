import { Colors } from 'config/theme';
import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const TouchBtn = ({
  onPress,
  label = 'Continue',
  isLoading = false,
  loadingText = 'Loading...',
  disabled = false,

  // Container styling
  containerClassName = 'px-6 pb-8',

  // Button styling
  buttonClassName = 'items-center rounded-lg py-4', // REMOVED 'w-full' from here
  backgroundColor = Colors?.primary,
  borderColor=Colors?.primary,
  borderWidth = 0,

  // Text styling
  textClassName = 'text-base font-bold',
  textColor = 'white',

  // Loading styling
  loadingColor = 'white',
  loadingSize = 'small',

  // Icon support
  icon,
  iconPosition = 'left', // 'left' or 'right'
  iconSpacing = 8, // spacing between icon and text

  // Touchable props
  activeOpacity = 0.8,
}) => {
  const handlePress = () => {
    if (!disabled && !isLoading) {
      onPress();
    }
  };

  const isDisabled = disabled || isLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-row items-center justify-center">
          <ActivityIndicator color={loadingColor} size={loadingSize} style={{ marginRight: 8 }} />
          <Text className={textClassName} style={{ color: textColor }}>
            {loadingText}
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-row items-center justify-center">
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: iconSpacing }}>{icon}</View>
        )}

        <Text className={textClassName} style={{ color: textColor }}>
          {label}
        </Text>

        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: iconSpacing }}>{icon}</View>
        )}
      </View>
    );
  };

  const buttonStyle = {
    backgroundColor: isDisabled ? '#9CA3AF' : backgroundColor,
    borderColor: borderColor || backgroundColor, // Default border color same as background
    borderWidth: borderWidth,
  };

  return (
    <View className={containerClassName}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        className={`${buttonClassName} ${isDisabled ? 'opacity-70' : ''}`}
        style={buttonStyle}
        activeOpacity={activeOpacity}>
        {renderContent()}
      </TouchableOpacity>
    </View>
  );
};

export default TouchBtn;