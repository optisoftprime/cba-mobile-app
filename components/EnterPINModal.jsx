// components/EnterPINModal.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { FaceIdSmallIcon } from 'svgs/faceIdSvg';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function EnterPINModal({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Enter PIN',
  subtitle = 'Enter your 4-digit transaction PIN',
}) {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (visible) {
      setPin(['', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    }
  }, [visible]);

  const handlePinChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 4) return;
    onConfirm(pinValue);
  };

  const handleFaceID = () => {
    console.log('Face ID authentication');
  };

  const pinComplete = pin.join('').length === 4;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={isLoading ? undefined : onClose}>
      {/* Full screen wrapper so Toast can be absolutely positioned within the modal layer */}
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Backdrop */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={isLoading ? undefined : onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* Sheet */}
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              paddingHorizontal: 24,
              paddingBottom: 40,
              paddingTop: 20,
            }}>
            {/* Handle + close row */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
              <View style={{ width: 32 }} />
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View
                  style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D1D5DB' }}
                />
              </View>
              {!isLoading ? (
                <TouchableOpacity
                  onPress={onClose}
                  activeOpacity={0.7}
                  style={{ width: 32, alignItems: 'flex-end' }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: '#F3F4F6',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons name="close" size={18} color="#374151" />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={{ width: 32 }} />
              )}
            </View>

            {/* Title */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 6,
              }}>
              {title}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginBottom: 32 }}>
              {subtitle}
            </Text>

            {/* PIN boxes */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(value) => handlePinChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  secureTextEntry
                  editable={!isLoading}
                  style={{
                    width: 60,
                    height: 60,
                    marginHorizontal: 8,
                    borderRadius: 16,
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: '700',
                    backgroundColor: digit ? Colors?.primary : 'white',
                    color: digit ? 'white' : Colors?.primary,
                    borderWidth: 2,
                    borderColor: Colors?.primary,
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
              ))}
            </View>

            {/* Face ID */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <TouchableOpacity
                onPress={handleFaceID}
                disabled={isLoading}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <FaceIdSmallIcon />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: isLoading ? '#9CA3AF' : Colors?.primary,
                  }}>
                  Face ID
                </Text>
              </TouchableOpacity>
            </View>

            {/* Confirm button */}
            <TouchBtn
              onPress={handleConfirm}
              label="Confirm"
              isLoading={isLoading}
              loadingText="Processing..."
              disabled={!pinComplete}
              textClassName="text-base font-semibold"
              buttonClassName="items-center rounded-lg py-4"
              activeOpacity={0.8}
              containerClassName=""
            />
          </View>
        </KeyboardAvoidingView>

        {/* Toast lives inside the modal's View so it renders on the same native layer */}
        <Toast />
      </View>
    </Modal>
  );
}
