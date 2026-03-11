// screens/SetUsernamePassword.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, Alert, BackHandler, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import TextInputComponent from 'components/textInputs';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { save, load } from 'config/storage';
import { register } from 'api/auth';
import Toast from 'react-native-toast-message';

export default function SetUsernamePassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocalSearchParams();

  const isFormReady =
    username.trim().length > 0 && password.length >= 6 && confirmPassword.length >= 6;

  // Save state so app can resume here if closed
  useEffect(() => {
    save('appState', {
      stage: 'setUser',
      params: {
        accountNumber: params?.accountNumber,
      },
    });
  }, []);

  const handleCancelConfirm = () => {
    Alert.alert(
      'Leave this page?',
      'Are you sure you want to go back? You will need to start this step over.',
      [
        { text: 'No, Stay', style: 'cancel' },
        {
          text: 'Yes, Leave',
          style: 'destructive',
          onPress: () => {
            save('appState', null);
            navigateBack();
          },
        },
      ]
    );
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

  const handleContinue = async () => {
    try {
      const accountNumber =
        params?.accountNumber || (await load('registrationState'))?.accountNumber;

      if (!accountNumber) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'Session expired, please start over' });
        save('appState', null);
        save('registrationState', null);
        navigateBack();
        return;
      }

      if (password !== confirmPassword) {
        Toast.show({ type: 'error', text1: 'Password Mismatch', text2: 'Passwords do not match' });
        return;
      }

      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Weak Password',
          text2: 'Password must be at least 6 characters',
        });
        return;
      }

      setIsLoading(true);

      const response = await register(null, {
        username: username.trim(),
        password,
        accountNumber,
      });

      console.log(JSON.stringify(response, null, 2));

      if (response?.ok) {
        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: 'Proceeding to next step...',
        });
        save('appState', null);
        save('registrationState', null);
        navigateTo('securityQuestion', { accountNumber, username: username.trim() });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response?.message || 'Something went wrong',
        });
      }

      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error?.message || 'Something went wrong',
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // setInterval(() => {
  //   console.log(params?.accountNumber);
  // }, 3000);

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Set your Username and Password"
          onLeftPress={handleCancelConfirm}
          showLeftIcon={true}
          subtitle="Kindly provide your preferred username and password"
        />

        <View className="flex-1 px-5 pt-2">
          <TextInputComponent
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            isLoading={isLoading}
            autoCapitalize="none"
          />

          <TextInputComponent
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            showPasswordToggle={true}
            secureTextEntry={!showPassword}
            onToggleSecureTextEntry={() => setShowPassword(!showPassword)}
            isLoading={isLoading}
          />

          <TextInputComponent
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            showPasswordToggle={true}
            secureTextEntry={!showConfirmPassword}
            onToggleSecureTextEntry={() => setShowConfirmPassword(!showConfirmPassword)}
            isLoading={isLoading}
            error={
              confirmPassword.length > 0 && password !== confirmPassword
                ? 'Passwords do not match'
                : null
            }
          />
        </View>

        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            isLoading={isLoading}
            loadingText="Please wait..."
            disabled={!isFormReady}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="rounded-lg py-4 items-center"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
