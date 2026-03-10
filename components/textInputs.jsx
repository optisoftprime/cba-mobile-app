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

  // Loading state
  isLoading = false,

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
  const handleIconPress = () => {
    if (showPasswordToggle && onToggleSecureTextEntry) {
      onToggleSecureTextEntry();
    } else if (onIconPress) {
      onIconPress();
    }
  };

  const getPasswordIconName = () => (secureTextEntry ? 'eye' : 'eye-off');
  const getIconName = () => (showPasswordToggle ? getPasswordIconName() : iconName);
  const hasIcon = iconName || showPasswordToggle;

  const actualLabelColor = labelColor || defaultLabelColor;
  const actualTextColor = textColor || defaultTextColor;

  const getInputPadding = () => {
    if (!hasIcon) return {};
    if (iconPosition === 'left') return { paddingLeft: 48 };
    if (iconPosition === 'right') return { paddingRight: 48 };
    return {};
  };

  const getIconPositionStyle = () => {
    if (iconPosition === 'left') return { left: 16 };
    if (iconPosition === 'right') return { right: 16 };
    return {};
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[styles.label, { color: isLoading ? '#9CA3AF' : actualLabelColor }, labelStyle]}>
          {label}
        </Text>
      )}

      <View style={isLoading ? styles.loadingOverlay : null}>
        {/* Icon - Left */}
        {hasIcon && iconPosition === 'left' && (
          <TouchableOpacity
            onPress={handleIconPress}
            style={[styles.icon, getIconPositionStyle(), iconContainerStyle]}
            activeOpacity={0.7}
            disabled={(!onIconPress && !showPasswordToggle) || isLoading}>
            <IconComponent
              name={getIconName()}
              size={iconSize}
              color={isLoading ? '#9CA3AF' : iconColor}
            />
          </TouchableOpacity>
        )}

        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          editable={!isLoading}
          style={[
            styles.input,
            getInputPadding(),
            {
              borderColor: error ? errorBorderColor : defaultBorderColor,
              fontSize: defaultFontSize,
              color: isLoading ? '#9CA3AF' : actualTextColor,
              backgroundColor: isLoading ? '#F3F4F6' : 'transparent',
              opacity: isLoading ? 0.7 : 1,
            },
            inputStyle,
            style,
          ]}
          {...props}
        />

        {/* Icon - Right */}
        {hasIcon && iconPosition === 'right' && (
          <TouchableOpacity
            onPress={handleIconPress}
            style={[styles.icon, getIconPositionStyle(), iconContainerStyle]}
            activeOpacity={0.7}
            disabled={(!onIconPress && !showPasswordToggle) || isLoading}>
            <IconComponent
              name={getIconName()}
              size={iconSize}
              color={isLoading ? '#9CA3AF' : iconColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && !isLoading && (
        <Text style={[styles.error, { color: errorBorderColor }, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  icon: {
    position: 'absolute',
    top: 12,
    zIndex: 10,
  },
  error: {
    marginTop: 4,
    fontSize: 14,
  },
  loadingOverlay: {
    opacity: 0.6,
  },
});

export default TextInputComponent;
