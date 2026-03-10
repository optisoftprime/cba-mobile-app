// screens/CurrentPin.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import { useLocalSearchParams } from 'expo-router';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';

export default function CurrentPin() {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

  const handlePinChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    console.log('PIN Value:', newPin.join(''));

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const pinValue = pin.join('');
    console.log('Complete PIN:', pinValue);

    if (pinValue.length !== 4) {
      console.log('Error: Please enter complete PIN');
      return;
    }

    console.log('Verifying PIN...');
    // Navigate to next screen (likely new PIN entry or success screen)
    navigateTo(params?.nextScreen || 'newPin');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style={'dark-content'} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Current PIN"
          onLeftPress={() => {
            navigateBack();
          }}
          showLeftIcon={true}
        />

        {/* Illustration */}
        <View className="mb-6 items-center px-5 pt-8">
          <Image
            source={require('../../assets/otp-page-image.png')} // SAME IMAGE AS OTP PAGE
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>

        {/* Description Text */}
        <View className="mb-8 px-5">
          <Text className="text-center text-sm leading-5 text-gray-600">
            Enter your current PIN
          </Text>
        </View>

        {/* PIN Input Boxes */}
        <View className="mb-8 flex-row justify-center px-5">
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={false} // Set to true if you want to hide PIN digits
              className="mx-1 rounded-lg text-center text-2xl font-bold"
              style={{
                width: 45,
                height: 56,
                backgroundColor: digit ? Colors?.primary : 'white',
                color: digit ? 'white' : '#0E7490',
                borderWidth: 2,
                borderColor: Colors?.primary,
              }}
            />
          ))}
        </View>

        {/* Continue Button */}
        <View className="mt-auto px-5 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}