import React from 'react';
import { View, Text, TextInput as RNTextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

const TextInputComponent = ({
  // Label & Error
  label,
  error,

  // Icon
  iconName,
  iconPosition = 'right',
  iconColor = Colors?.primary,
  onIconPress,
  IconComponent = Ionicons,
  iconSize = 20,

  // Password toggle
  showPasswordToggle = false,
  secureTextEntry = false,
  onToggleSecureTextEntry,

  // Custom styles
  containerStyle = {},
  labelStyle = {},
  inputStyle = {},
  errorStyle = {},
  iconContainerStyle = {},

  // Border colors
  defaultBorderColor = '#D1D5DB',
  errorBorderColor = '#EF4444',

  // Font size
  defaultFontSize = 16,

  // Placeholder color
  placeholderTextColor = '#9CA3AF',

  // Text colors
  defaultTextColor = '#1F2937',
  defaultLabelColor = '#1F2937',
  labelColor,
  textColor,

  // State
  value,
  onChangeText,

  // Additional props
  style,
  ...props
}) => {
  // Handle icon click
  const handleIconPress = () => {
    if (showPasswordToggle && onToggleSecureTextEntry) {
      onToggleSecureTextEntry();
    } else if (onIconPress) {
      onIconPress();
    }
  };

  // Determine which icon to show for password
  const getPasswordIconName = () => {
    return secureTextEntry ? 'eye' : 'eye-off';
  };

  // Get the actual icon to display
  const getIconName = () => {
    if (showPasswordToggle) {
      return getPasswordIconName();
    }
    return iconName;
  };

  // Check if we have any icon
  const hasIcon = iconName || showPasswordToggle;

  // Determine actual colors to use
  const actualLabelColor = labelColor || defaultLabelColor;
  const actualTextColor = textColor || defaultTextColor;

  // Calculate padding based on icon position
  const getInputPadding = () => {
    if (!hasIcon) return {};

    if (iconPosition === 'left') {
      return { paddingLeft: 48 }; // 12 * 4
    } else if (iconPosition === 'right') {
      return { paddingRight: 48 };
    }
    return {};
  };

  // Get icon position style
  const getIconPositionStyle = () => {
    if (iconPosition === 'left') {
      return { left: 16 }; // left-4
    } else if (iconPosition === 'right') {
      return { right: 16 };
    }
    return {};
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label - EXACT match to your original */}
      {label && (
        <Text style={[styles.label, { color: actualLabelColor }, labelStyle]}>{label}</Text>
      )}

      {/* Input Container - No extra wrapper styles */}
      <View>
        {/* Icon - Left Position */}
        {hasIcon && iconPosition === 'left' && (
          <TouchableOpacity
            onPress={handleIconPress}
            style={[styles.icon, getIconPositionStyle(), iconContainerStyle]}
            activeOpacity={0.7}
            disabled={!onIconPress && !showPasswordToggle}>
            <IconComponent
              name={getIconName()}
              size={iconSize}
              color={iconColor}
              style={iconContainerStyle}
            />
          </TouchableOpacity>
        )}

        {/* Text Input - EXACT match to your original */}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            getInputPadding(),
            {
              borderColor: error ? errorBorderColor : defaultBorderColor,
              fontSize: defaultFontSize,
              color: actualTextColor,
            },
            inputStyle,
            style,
          ]}
          {...props}
        />

        {/* Icon - Right Position */}
        {hasIcon && iconPosition === 'right' && (
          <TouchableOpacity
            onPress={handleIconPress}
            style={[styles.icon, getIconPositionStyle(), iconContainerStyle]}
            activeOpacity={0.7}
            disabled={!onIconPress && !showPasswordToggle}>
            <IconComponent
              name={getIconName()}
              size={iconSize}
              color={iconColor}
              style={iconContainerStyle}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={[styles.error, { color: errorBorderColor }, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24, // This is the ONLY difference - your original has mb-6 (24px)
    // If you want NO margin, change this to 0
  },
  label: {
    marginBottom: 8, // mb-2 = 8px
    fontSize: 14, // text-sm
    fontWeight: '600', // font-semibold
  },
  input: {
    borderRadius: 8, // rounded-lg
    borderWidth: 1,
    paddingHorizontal: 16, // px-4 = 16px
    paddingVertical: 12, // py-3 = 12px
    fontSize: 16, // text-base
  },
  icon: {
    position: 'absolute',
    top: 12, // Align with input padding
    zIndex: 10,
  },
  error: {
    marginTop: 4, // mt-1
    fontSize: 14, // text-sm
  },
});

export default TextInputComponent;
