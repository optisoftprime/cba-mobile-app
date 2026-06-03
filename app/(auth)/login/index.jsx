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
import { fetchUserDetails } from 'api/userProfile';

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
  const [biometricType, setBiometricType] = useState(null); // 'fingerprint' | 'face' | null
  const [isTokenValid, setIsTokenValid] = useState(false);

  const isFormReady = username.trim().length > 0 && password.trim().length > 0;
  const isAnyLoading = isLoading || isBiometricLoading;

  const slideAnim = useRef(new Animated.Value(0)).current;

  // Check if existing token is still valid on mount
  useEffect(() => {
    async function checkTokenValidity() {
      const response = await fetchUserDetails();
      if (response?.ok) {
        setIsTokenValid(true);
      }
    }
    checkTokenValidity();
  }, []);

  // Sliding background loop
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

  // Check biometric availability + saved session
  useEffect(() => {
    async function checkBiometricAndSession() {
      const [user, hasHardware, isEnrolled, supportedTypes] = await Promise.all([
        getUser(),
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
        LocalAuthentication.supportedAuthenticationTypesAsync(),
      ]);

      const sessionExists =
        !!user?.accountNumber || !!user?.firstName || !!user?.username;

      const canUseBiometric = hasHardware && isEnrolled;
      setBiometricAvailable(canUseBiometric);
      setHasSavedSession(sessionExists);

      if (canUseBiometric && supportedTypes?.length > 0) {
        // FACIAL_RECOGNITION = 2, FINGERPRINT = 1
        const hasFace = supportedTypes.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        );
        setBiometricType(hasFace ? 'face' : 'fingerprint');
      }
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
        if (isAnyLoading) return true;
        return false;
      });
      return () => backHandler.remove();
    }, [isAnyLoading])
  );

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await login(null, {
      username: username.trim(),
      password: password.trim(),
    });
    console.log(JSON.stringify(response, null, 2));

    if (response?.ok) {
      const accessToken = response?.data?.data?.token;
      const refreshToken = response?.data?.data?.refreshToken;
      await saveSecure('auth', { accessToken, refreshToken });
      if (rememberMe) {
        await save('user', { username: response?.data?.data?.username });
      }
      navigateTo('appLayout');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: response?.message || 'Invalid credentials. Please try again.',
      });
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsBiometricLoading(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage:
          biometricType === 'face'
            ? 'Look at your camera to continue'
            : 'Touch the fingerprint sensor to continue',
        fallbackLabel: 'Use PIN / Password',
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
      });

      if (result.success) {
        navigateTo('appLayout');
      } else {
        // result.error values: user_cancel, system_cancel, app_cancel,
        // authentication_failed, not_enrolled, not_available, passcode_not_set, lockout, lockout_permanent, unknown
        if (result.error === 'lockout' || result.error === 'lockout_permanent') {
          Toast.show({
            type: 'error',
            text1: 'Too Many Attempts',
            text2: 'Biometric locked. Please log in with your password.',
          });
        } else if (
          result.error !== 'user_cancel' &&
          result.error !== 'system_cancel' &&
          result.error !== 'app_cancel'
        ) {
          Toast.show({
            type: 'error',
            text1: 'Verification Failed',
            text2: 'Could not verify your identity. Please log in manually.',
          });
        }
        // user_cancel / system_cancel: silent — no toast needed
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Biometric Error',
        text2: 'An unexpected error occurred. Please log in manually.',
      });
    } finally {
      setIsBiometricLoading(false);
    }
  };

  const showBiometricButton = hasSavedSession && biometricAvailable && isTokenValid;

  const biometricIcon =
    biometricType === 'face'
      ? isBiometricLoading
        ? 'ellipsis-horizontal'
        : 'scan-outline'
      : isBiometricLoading
        ? 'ellipsis-horizontal'
        : 'finger-print';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: Colors.primary,
          opacity: 0.6,
        }}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 80,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isAnyLoading}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 6 }}>
            Welcome back
          </Text>
          <Text style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 22 }}>
            Sign in to continue to your account
          </Text>
        </View>

        {/* Form */}
        <View style={{ width: '100%' }}>
          {/* Username */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 8, fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)', letterSpacing: 0.3 }}>
              USERNAME
            </Text>
            <TextInput
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.25)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                paddingHorizontal: 16,
                paddingVertical: 15,
                fontSize: 15,
                color: 'white',
              }}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isAnyLoading}
              placeholder="Enter your username"
              placeholderTextColor="rgba(255,255,255,0.35)"
            />
          </View>

          {/* Password */}
          <View style={{ marginBottom: 32 }}>
            <Text style={{ marginBottom: 8, fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)', letterSpacing: 0.3 }}>
              PASSWORD
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.25)',
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}>
              <TextInput
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 15,
                  fontSize: 15,
                  color: 'white',
                }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!isAnyLoading}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255,255,255,0.35)"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingHorizontal: 16, paddingVertical: 15 }}
                disabled={isAnyLoading}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="rgba(255,255,255,0.65)"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login + Biometric button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 }}>
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
                buttonClassName="w-full items-center rounded-xl py-4"
                containerClassName=""
              />
            </View>

            {showBiometricButton && (
              <TouchableOpacity
                onPress={handleBiometricLogin}
                disabled={isAnyLoading}
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderWidth: 1.5,
                  borderColor: 'rgba(255,255,255,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isAnyLoading ? 0.45 : 1,
                }}
                activeOpacity={0.7}>
                <Ionicons
                  name={biometricIcon}
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom links row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              flexWrap: 'wrap',
            }}>
            <TouchableOpacity
              onPress={() => navigateReplace('registrationSteps')}
              disabled={isAnyLoading}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>·</Text>

            <TouchableOpacity
              onPress={() => navigateReplace('registration')}
              disabled={isAnyLoading}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Register</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>·</Text>

            <TouchableOpacity
              onPress={() => navigateTo('forgetPassword')}
              disabled={isAnyLoading}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}