// screens/OTPVerification.jsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, BackHandler } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import Toast from 'react-native-toast-message';
import { save, load } from 'config/storage';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(234);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log('OTP Screen Params:', JSON.stringify(params, null, 2));
  }, []);

  // Save OTP stage when app backgrounds so user can resume
  useEffect(() => {
    save('appState', {
      stage: 'otp',
      phoneNumber: params?.phoneNumber,
      nextScreen: params?.nextScreen,
      timerSnapshot: timer,
    });

    return () => {
      // Clear app state when leaving this screen normally
      save('appState', null);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCancelConfirm = () => {
    Alert.alert(
      'Cancel Process',
      'Are you sure you want to cancel? You will need to start over.',
      [
        { text: 'No, Stay', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            save('appState', null);
            navigateBack();
          },
        },
      ]
    );
  };

  // Hardware back button
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        handleCancelConfirm();
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Please enter all 6 digits' });
      return;
    }

    setIsLoading(true);

    // Fake API simulation for now
    await new Promise((resolve) => setTimeout(resolve, 1500));
    Toast.show({ type: 'success', text1: 'OTP Verified!', text2: 'Proceeding to next step...' });

    setIsLoading(false);
    // navigateTo(params?.nextScreen || 'setUser'); // uncomment when real API is ready
  };

  const handleResendCode = () => {
    setTimer(234);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    Toast.show({ type: 'info', text1: 'OTP Resent', text2: `Code sent to ${params?.phoneNumber}` });
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="OTP" onLeftPress={handleCancelConfirm} showLeftIcon={true} />

        <View className="mb-6 items-center px-5">
          <Image
            source={require('../../../assets/otp-page-image.png')}
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>

        <View className="mb-8 px-5">
          <Text className="text-center text-sm leading-5 text-gray-600">
            A one time password (OTP) has been sent to your{' '}
            <Text className="font-semibold text-gray-900">
              {params?.phoneNumber || '+000000000000'}
            </Text>
          </Text>
        </View>

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
              editable={!isLoading}
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

        <View className="mb-8 items-center">
          <Text className="mb-1 text-sm text-gray-600">Didn&apos;t receive code?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={timer > 0 || isLoading}>
            <Text
              className="text-sm font-semibold"
              style={{ color: timer > 0 ? '#9CA3AF' : Colors?.primary }}>
              Resend {formatTime(timer)}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-auto px-5 pb-6">
          <TouchBtn
            onPress={handleContinue}
            isLoading={isLoading}
            loadingText="Verifying..."
            label="Continue"
            disabled={otp.join('').length !== 6}
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