import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import Toast from 'react-native-toast-message';
import { save } from 'config/storage';
import { validateOtp } from 'api/auth';

export default function VerifyPhoneNumber() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(154);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log('VerifyPhoneNumber params:', JSON.stringify(params, null, 2));
  }, []);

  // Persist app state so users can resume after app close
  useEffect(() => {
    save('appState', {
      stage: 'verifyPhoneNumber',
      params: {
        phoneNumber: params?.phoneNumber,
        email: params?.email,
        nextScreen: params?.nextScreen,
      },
    });
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCancelConfirm = () => {
    Alert.alert('Cancel Process', 'Are you sure you want to cancel? You will need to start over.', [
      { text: 'No, Stay', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => {
          save('appState', null);
          navigateBack();
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        handleCancelConfirm();
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

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
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendCode = () => {
    setTimer(154);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleContinue = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Please enter all 6 digits' });
      return;
    }

    setIsLoading(true);

    const payload = {
      otp: otpValue,
      email: params?.email,
      phoneNumber: params?.phoneNumber,
    };

    console.log('validateOtp payload:', JSON.stringify(payload, null, 2));

    const response = await validateOtp(null, payload);

    console.log('validateOtp response:', JSON.stringify(response, null, 2));

    if (response?.ok) {
      Toast.show({ type: 'success', text1: 'OTP Verified!', text2: 'Proceeding to next step...' });
      save('appState', null);
      navigateTo(params?.nextScreen || 'openAccountSuccess');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: response?.message || 'Invalid OTP',
      });
    }

    setIsLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />

      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className="h-full rounded-full"
            style={{ width: '50%', backgroundColor: Colors?.primary }}
          />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 3 of 6</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header
          title="Verify Phone Number"
          subtitle={`Enter the code sent to ${params?.phoneNumber || 'your phone'}`}
          showLeftIcon={true}
          onLeftPress={handleCancelConfirm}
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

          {/* Description */}
          <View className="mb-8">
            <Text className="text-center text-sm leading-5 text-gray-600">
              A one time password (OTP) has been sent to{' '}
              <Text className="font-semibold text-gray-900">
                {params?.phoneNumber || 'your phone number'}
              </Text>
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
                editable={!isLoading}
                caretHidden={true}
                className="mx-1 rounded-lg text-center text-2xl font-bold"
                style={{
                  width: 48,
                  height: 56,
                  backgroundColor: digit ? Colors?.primary : 'white',
                  color: digit ? 'white' : Colors?.primary,
                  borderWidth: 2,
                  borderColor: Colors?.primary,
                }}
              />
            ))}
          </View>

          {/* Resend Code */}
          <View className="mb-8 items-center">
            <Text className="mb-1 text-sm text-gray-600">Didn't receive code?</Text>
            <TouchableOpacity onPress={handleResendCode} disabled={timer > 0 || isLoading}>
              <Text
                className="text-sm font-semibold"
                style={{ color: timer > 0 ? '#9CA3AF' : Colors?.primary }}>
                Resend {timer > 0 ? formatTime(timer) : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8">
        <TouchBtn
          onPress={handleContinue}
          label="Continue"
          isLoading={isLoading}
          loadingText="Verifying..."
          disabled={otp.join('').length !== 6 || isLoading}
          textClassName="text-base font-bold text-white"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}
