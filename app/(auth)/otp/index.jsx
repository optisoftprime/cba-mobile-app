// screens/OTPVerification.jsx
import React, { useState, useRef, useEffect } from 'react';
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
import { useCallback } from 'react';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import Toast from 'react-native-toast-message';
import { save, load } from 'config/storage';
import { validateOtp } from 'api/auth';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(234);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log('OTP Screen Params:', JSON.stringify(params, null, 2));
  }, []);

  useEffect(() => {
    save('appState', {
      stage: 'otp',
      params: {
        phoneNumber: params?.phoneNumber,
        accountNumber: params?.accountNumber,
        nextScreen: params?.nextScreen,
      },
    });
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCancelConfirm = () => {
    Alert.alert('Cancel Process', 'Are you sure you want to cancel? You will need to start over.', [
      { text: 'No, Stay', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => {
          save('appState', null);
          save('registrationState', null);
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

    // Move forward only if a digit was entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index]) {
        // Clear current box but stay focused here
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Current box already empty — go back and clear previous
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleContinue = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      Toast.show({ type: 'error', text1: 'Invalid OTP', text2: 'Please enter all 6 digits' });
      return;
    }

    const accountNumber = params?.accountNumber || (await load('registrationState'))?.accountNumber;

    if (!accountNumber) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Session expired, please start over' });
      save('appState', null);
      save('registrationState', null);
      navigateBack();
      return;
    }

    setIsLoading(true);

    const response = await validateOtp(null, { otp: otpValue, accountNumber });

    if (response?.ok) {
      Toast.show({ type: 'success', text1: 'OTP Verified!', text2: 'Proceeding to next step...' });
      save('appState', null);
      navigateTo(params?.nextScreen || 'landingScreen', { accountNumber });
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
              caretHidden={true}
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
