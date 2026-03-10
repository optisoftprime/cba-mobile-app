// screens/WelcomeScreen.jsx
import { navigateTo } from 'app/navigate';
import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Alert, BackHandler } from 'react-native';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import { useFocusEffect } from 'expo-router';

export default function WelcomeScreen() {
  const handleLogin = () => navigateTo('login');
  const handleRegister = () => navigateTo('registrationSteps');
  const handleOpenAccount = () => navigateTo('openNewAccount');
  const handleHelp = () => console.log('Navigate to Help');

  const handleQuit = () => {
    Alert.alert('Exit App', 'Are you sure you want to quit?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: () => BackHandler.exitApp() },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        handleQuit();
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../../assets/iPhone 13 mini - 1562.png')}
      className="flex-1"
      resizeMode="cover">
      <GlobalStatusBar style={'white-content'} />

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
            <TouchBtn
              onPress={handleLogin}
              label="Login"
              backgroundColor="white"
              textColor={Colors?.primary}
              textClassName="text-base font-semibold"
              buttonClassName="mb-4 items-center rounded-lg py-4"
              activeOpacity={0.8}
              containerClassName=""
            />

            <TouchBtn
              onPress={handleRegister}
              label="Register"
              backgroundColor="rgba(255, 255, 255, 0.25)"
              textClassName="text-base font-semibold"
              buttonClassName="mb-6 items-center rounded-lg py-4"
              activeOpacity={0.8}
              containerClassName=""
            />

            <View className="flex-row justify-between px-1">
              <TouchBtn
                onPress={handleOpenAccount}
                label="Open Account"
                backgroundColor="transparent"
                textColor="white"
                textClassName="text-sm font-medium"
                buttonClassName=""
                containerClassName=""
              />

              <TouchBtn
                onPress={handleHelp}
                label="Help"
                backgroundColor="transparent"
                textColor="white"
                textClassName="text-sm font-medium"
                buttonClassName=""
                containerClassName=""
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
