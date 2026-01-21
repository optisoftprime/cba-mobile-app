import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';

export default function VerifyPhoneNumber() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(154); // 02:34 in seconds
  const inputRefs = useRef([]);

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

    navigateTo("openAccountSuccess")
  };

  const handleResendCode = () => {
    console.log('Resending OTP...');
    setTimer(154); // Reset timer
    setOtp(['', '', '', '', '', '']); // Clear OTP
    inputRefs.current[0]?.focus();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-[#157196]" style={{ width: '50%' }} />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 3 of 6</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Header */}
        <Header
          title="Verify Phone Number"
          subtitle="Enter the code sent to 08098765432"
          showLeftIcon={true}
          containerStyle={{ marginTop: -25 }}
        />

        <View className="px-4">
          {/* Illustration */}
          <View className="mb-6 items-center">
            <Image
              source={require('../../../assets/otp-page-image.png')}
              style={{ width: 280, height: 280 }}
              resizeMode="contain"
            />
          </View>

          {/* Description Text */}
          <View className="mb-8">
            <Text className="text-center text-sm leading-5 text-gray-600">
              A one time password (OTP) has been sent to{' '}
              <Text className="font-semibold text-gray-900">+2349098765432</Text>
            </Text>
          </View>

          {/* OTP Input Boxes */}
          <View className="mb-8 flex-row justify-center">
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
                  width: 48,
                  height: 56,
                  backgroundColor: digit ? '#157196' : 'white',
                  color: digit ? 'white' : '#157196',
                  borderWidth: 2,
                  borderColor: '#157196',
                }}
              />
            ))}
          </View>

          {/* Resend Code */}
          <View className="mb-8 items-center">
            <Text className="mb-1 text-sm text-gray-600">Didn't receive code?</Text>
            <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
              <Text
                className="text-sm font-semibold"
                style={{ color: timer > 0 ? '#157196' : '#9CA3AF' }}>
                Resend {formatTime(timer)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full items-center rounded-lg bg-[#157196] py-4">
          <Text className="text-base font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
