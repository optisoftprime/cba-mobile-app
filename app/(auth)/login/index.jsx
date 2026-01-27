// screens/LoginScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import TextInputComponent from './../../../components/textInputs';

export default function LoginScreen() {
  const [accountNumber, setAccountNumber] = useState('0987654321');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    console.log('Login pressed');
    console.log('Account:', accountNumber);
    console.log('Password:', password);
    // Add your navigation logic here
    navigateTo('appLayout');
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
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="px-4">
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
                onPress={() => setRememberMe(!rememberMe)}>
                <View className="mr-2 h-[18px] w-[18px] items-center justify-center rounded border-2 border-white bg-white">
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#0E7490" />}
                </View>
                <Text className="text-sm text-white">Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigateTo('forgetPassword');
                }}>
                <Text className="text-sm text-white">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="mt-5 items-center rounded-lg bg-white py-4"
              onPress={handleLogin}
              activeOpacity={0.8}>
              <Text className="text-base font-semibold" style={{ color: Colors?.primary }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
