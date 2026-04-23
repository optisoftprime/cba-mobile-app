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
import { navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import { login } from 'api/auth';
import Toast from 'react-native-toast-message';
import { save, saveSecure } from 'config/storage';
import TouchBtn from 'components/touchBtn';
import { useFocusEffect } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isFormReady = username.trim().length > 0 && password.trim().length > 0;

  // Animate two copies of the background sliding left in a loop
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

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(true, 'none');
      NavigationBar.setVisibilityAsync('hidden');
      // NavigationBar.setBehaviorAsync('overlay-swipe');
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isLoading) return true;
        return false;
      });
      return () => backHandler.remove();
    }, [isLoading])
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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary,opacity:0.7 }}>

      {/* Sliding background — two copies side by side for seamless loop */}
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

      {/* Dark overlay so text stays readable */}
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
        scrollEnabled={!isLoading}>

        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <View style={{ marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Image
              source={require('../../../assets/cropedAppLogo-removebg-preview.png')}
              style={{ width: 55, height: 55 }}
              resizeMode="contain"
            />
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
              editable={!isLoading}
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
                editable={!isLoading}
                placeholder="Enter password"
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ paddingHorizontal: 16 }}
                disabled={isLoading}>
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
              onPress={() => setRememberMe(!rememberMe)}
              disabled={isLoading}>
              <View
                style={{
                  marginRight: 8,
                  height: 18,
                  width: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: 'white',
                  backgroundColor: 'white',
                }}>
                {rememberMe && <Ionicons name="checkmark" size={14} color="#0E7490" />}
              </View>
              <Text style={{ fontSize: 14, color: 'white' }}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateTo('forgetPassword')} disabled={isLoading}>
              <Text style={{ fontSize: 14, color: 'white' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchBtn
            onPress={handleLogin}
            label="Login"
            isLoading={isLoading}
            loadingText="Please wait..."
            disabled={!isFormReady}
            backgroundColor="white"
            textColor={Colors?.primary}
            loadingColor={Colors?.primary}
            textClassName="text-base font-semibold"
            buttonClassName="w-full items-center rounded-lg py-4"
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}