// screens/LoginScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateReplace, navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import { login } from 'api/auth';
import Toast from 'react-native-toast-message';
import { save, saveSecure, getUser } from 'config/storage';
import TouchBtn from 'components/touchBtn';
import { useFocusEffect } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import * as LocalAuthentication from 'expo-local-authentication';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [hasSavedSession, setHasSavedSession] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  const isFormReady = username.trim().length > 0 && password.trim().length > 0;

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    async function checkBiometricAndSession() {
      const [user, hasHardware, isEnrolled] = await Promise.all([
        getUser(),
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);

      // Show fingerprint button only if:
      // 1. Device supports biometrics and has enrolled biometrics
      // 2. User has a saved session with meaningful data
      const sessionExists =
        !!user?.accountNumber || !!user?.firstName || !!user?.username;

      setBiometricAvailable(hasHardware && isEnrolled);
      setHasSavedSession(sessionExists);
    }

    checkBiometricAndSession();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true, 'none');
      NavigationBar.setVisibilityAsync('hidden');
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isLoading || isBiometricLoading) return true;
        return false;
      });
      return () => backHandler.remove();
    }, [isLoading, isBiometricLoading])
  );

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await login(null, {
      username: username.trim(),
      password: password.trim(),
    });

    if (response?.ok) {
      const accessToken = response?.data?.data?.token;
      await saveSecure('auth', { accessToken });
      if (rememberMe) {
        await save('user', { username: response?.data?.data?.username });
      }
      navigateTo('appLayout');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: response?.message || 'Invalid credentials',
      });
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsBiometricLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verify your identity',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        navigateTo('appLayout');
      } else {
        if (result.error !== 'user_cancel' && result.error !== 'system_cancel') {
          Toast.show({
            type: 'error',
            text1: 'Authentication Failed',
            text2: 'Could not verify your identity. Try logging in manually.',
          });
        }
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Biometric Error',
        text2: 'Something went wrong. Please log in manually.',
      });
    } finally {
      setIsBiometricLoading(false);
    }
  };

  const showBiometricButton = hasSavedSession && biometricAvailable;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary, opacity: 0.7 }}>

      {/* Sliding background */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width * 2,
          height,
          flexDirection: 'row',
          transform: [{ translateX: slideAnim }],
        }}>
        <Image
          source={require('../../../assets/image 2.png')}
          style={{ width, height }}
          resizeMode="cover"
        />
        <Image
          source={require('../../../assets/image 2.png')}
          style={{ width, height }}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Dark overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: Colors.primary,
          opacity: 0.55,
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 80 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isLoading && !isBiometricLoading}>

        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>Login</Text>
          </View>
          <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
            Kindly login into your account
          </Text>
        </View>

        <View style={{ width: '100%' }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: 'white' }}>
              Username
            </Text>
            <TextInput
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                paddingHorizontal: 16,
                paddingVertical: 16,
                fontSize: 16,
                color: 'white',
              }}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              editable={!isLoading && !isBiometricLoading}
              placeholder="Enter username"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: 'white' }}>
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}>
              <TextInput
                style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16, fontSize: 16, color: 'white' }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isLoading && !isBiometricLoading}
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingHorizontal: 16 }}
                disabled={isLoading || isBiometricLoading}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => navigateReplace('registrationSteps')}
              disabled={isLoading || isBiometricLoading}>
              <Text style={{ fontSize: 14, color: 'white' }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateTo('forgetPassword')}
              disabled={isLoading || isBiometricLoading}>
              <Text style={{ fontSize: 14, color: 'white' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login button row — with optional fingerprint button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <TouchBtn
                onPress={handleLogin}
                label="Login"
                isLoading={isLoading}
                loadingText="Please wait..."
                disabled={!isFormReady || isBiometricLoading}
                backgroundColor="white"
                textColor={Colors?.primary}
                loadingColor={Colors?.primary}
                textClassName="text-base font-semibold"
                buttonClassName="w-full items-center rounded-lg py-4"
                containerClassName=""
              />
            </View>

            {showBiometricButton && (
              <TouchableOpacity
                onPress={handleBiometricLogin}
                disabled={isLoading || isBiometricLoading}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.35)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isLoading || isBiometricLoading ? 0.5 : 1,
                }}
                activeOpacity={0.7}>
                <Ionicons
                  name={isBiometricLoading ? 'ellipsis-horizontal' : 'finger-print'}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}