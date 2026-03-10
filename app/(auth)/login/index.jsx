// screens/LoginScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import TextInputComponent from './../../../components/textInputs';
import { login } from 'api/auth';
import Toast from 'react-native-toast-message';
import { save } from 'config/storage';

export default function LoginScreen() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isFormReady = accountNumber.replace(/\s/g, '').length === 10 && password.length > 0;

  const handleLogin = async () => {
    setIsLoading(true);

    const response = await login(null, {
      username: accountNumber.replace(/\s/g, '').trim(),
      password,
    });

    
    console.log(JSON.stringify(response, null, 2));

    if (response?.ok) {
      const accessToken = response?.data?.data?.accessToken || response?.data?.accessToken;

      // Save token to storage
      await save('auth', { accessToken });

      // Save account if remember me
      if (rememberMe) {
        await save('user', { accountNumber: accountNumber.replace(/\s/g, '').trim() });
      }

      Toast.show({ type: 'success', text1: 'Welcome back!', text2: 'Login successful' });
      navigateTo('appLayout');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: response?.message || 'Invalid credentials',
      });
    }

    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require('../../../assets/image 2.png')}
      className="flex-1"
      resizeMode="cover">
      <View className="flex-1" style={{ backgroundColor: Colors.primary, opacity: 0.75 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 80 }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-14 items-center">
            <Text className="mb-2 text-3xl font-bold text-white">Login</Text>
            <Text className="text-sm text-white/80">Kindly login into your account</Text>
          </View>

          {/* Form */}
          <View className="w-full">
            {/* Account Number */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-white">Account Number</Text>
              <TextInput
                className="rounded-lg border border-white/30 bg-white/10 px-4 py-4 text-base text-white"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                maxLength={10}
                editable={!isLoading}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

            {/* Password */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-white">Password</Text>
              <View className="flex-row items-center rounded-lg border border-white/30 bg-white/10">
                <TextInput
                  className="flex-1 px-4 py-4 text-base text-white"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="px-4"
                  disabled={isLoading}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="mb-10 flex-row items-center justify-between">
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setRememberMe(!rememberMe)}
                disabled={isLoading}>
                <View className="mr-2 h-[18px] w-[18px] items-center justify-center rounded border-2 border-white bg-white">
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#0E7490" />}
                </View>
                <Text className="text-sm text-white">Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigateTo('forgetPassword')} disabled={isLoading}>
                <Text className="text-sm text-white">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="mt-5 items-center rounded-lg py-4"
              style={{ backgroundColor: isFormReady && !isLoading ? 'white' : '#9CA3AF' }}
              onPress={handleLogin}
              disabled={!isFormReady || isLoading}
              activeOpacity={0.8}>
              {isLoading ? (
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold" style={{ color: Colors?.primary }}>
                    Please wait...
                  </Text>
                </View>
              ) : (
                <Text
                  className="text-base font-semibold"
                  style={{ color: isFormReady ? Colors?.primary : 'white' }}>
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
