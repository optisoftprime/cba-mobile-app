// screens/WelcomeScreen.jsx
import { navigateTo } from 'app/navigate';
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

export default function WelcomeScreen() {
  const handleLogin = () => {
    navigateTo('login');
    // navigateTo('login');
  };

  const handleRegister = () => {
    navigateTo('registrationSteps');
  };

  const handleOpenAccount = () => {
   navigateTo("openNewAccount")
  };

  const handleHelp = () => {
    console.log('Navigate to Help');
  };

  return (
    <ImageBackground
      source={require('../../assets/iPhone 13 mini - 1562.png')}
      className="flex-1"
      resizeMode="cover">
      <View className="flex-1 bg-black/40">
        <View className="flex-1 justify-between px-5 pb-10 pt-16">
          {/* Hero Section */}
          <View className="mt-10">
            <Text className="mb-4 text-4xl font-bold leading-[44px] text-white">
              Banking Made{'\n'}Simple
            </Text>
            <Text className="text-[15px] leading-6 text-white opacity-95">
              Save, send, paybills, and access{'\n'}loans–all in one app
            </Text>
          </View>

          {/* Buttons Section */}
          <View className="w-full">
            {/* Login Button */}
            <TouchableOpacity
              className="mb-4 items-center rounded-lg bg-white py-4"
              onPress={handleLogin}
              activeOpacity={0.8}>
              <Text className="text-base font-semibold text-[#0E7490]">Login</Text>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity
              className="mb-6 items-center rounded-lg bg-white/25 py-4"
              onPress={handleRegister}
              activeOpacity={0.8}>
              <Text className="text-base font-semibold text-white">Register</Text>
            </TouchableOpacity>

            {/* Bottom Links */}
            <View className="flex-row justify-between px-1">
              <TouchableOpacity onPress={handleOpenAccount}>
                <Text className="text-sm font-medium text-white">Open Account</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleHelp}>
                <Text className="text-sm font-medium text-white">Help</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
