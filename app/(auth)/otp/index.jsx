// screens/OTPVerification.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import { useLocalSearchParams } from 'expo-router';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(234); // 02:34 in seconds
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    console.log('OTP Value:', newOtp.join(''));

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    // const otpValue = otp.join('');
    // console.log('Complete OTP:', otpValue);

    // if (otpValue.length !== 6) {
    //   console.log('Error: Please enter complete OTP');
    //   return;
    // }

    // console.log('Verifying OTP...');
    // Navigate to next screen
    navigateTo(params?.nextScreen || 'setUser');
  };

  const handleResendCode = () => {
    console.log('Resending OTP...');
    setTimer(234); // Reset timer
    setOtp(['', '', '', '', '', '']); // Clear OTP
    inputRefs.current[0]?.focus();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style={"dark-content"}/>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="OTP"
          onLeftPress={() => {
            navigateBack();
          }}
          showLeftIcon={true}
        />

        {/* Illustration */}
        <View className="mb-6 items-center px-5">
          <Image
            source={require('../../../assets/otp-page-image.png')} // REPLACE WITH YOUR IMAGE PATH
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>

        {/* Description Text */}
        <View className="mb-8 px-5">
          <Text className="text-center text-sm leading-5 text-gray-600">
            A one time password (OTP) has been sent to your{' '}
            <Text className="font-semibold text-gray-900">+2349008765432</Text>
          </Text>
        </View>

        {/* OTP Input Boxes */}
        <View className="mb-8 flex-row justify-center px-5">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
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

        {/* Resend Code */}
        <View className="mb-8 items-center">
          <Text className="mb-1 text-sm text-gray-600">Didn&apos;t receive code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
            <Text
              className="text-sm font-semibold"
              style={{ color: timer > 0 ? Colors?.primary : '#9CA3AF' }}>
              Resend {formatTime(timer)}
            </Text>
          </TouchableOpacity>
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
