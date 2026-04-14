// screens/LoginScreen.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import { login } from 'api/auth';
import Toast from 'react-native-toast-message';
import { save, saveSecure } from 'config/storage';
import TouchBtn from 'components/touchBtn';
import { useFocusEffect } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isFormReady = username.trim().length > 0 && password.trim().length > 0;

  // Block back button while loading
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

    console.log(JSON.stringify(response, null, 2));

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
      setIsLoading(false); // only reset on failure; success navigates away
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/image 2.png')}
      className="flex-1"
      resizeMode="cover">
      <View className="flex-1" style={{ backgroundColor: Colors.primary, opacity: 0.75 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 80 }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!isLoading}>

          <View className="mb-8 items-center">
            {/* Fixed: row layout with centred image, no clipping */}
            <View className="mb-2 flex-row items-center gap-x-1">
              <Image
                source={require('../../../assets/cropedAppLogo-removebg-preview.png')}
                style={{ width: 55, height: 55 }}
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-white">Login</Text>
            </View>
            <Text className="text-sm text-white/80">Kindly login into your account</Text>
          </View>

          <View className="w-full">
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-white">Username</Text>
              <TextInput
                className="rounded-lg border border-white/30 bg-white/10 px-4 py-4 text-base text-white"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading}
                placeholder="Enter username"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>

            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-white">Password</Text>
              <View className="flex-row items-center rounded-lg border border-white/30 bg-white/10">
                <TextInput
                  className="flex-1 px-4 py-4 text-base text-white"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                  placeholder="Enter password"
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
              buttonClassName="w-full items-center rounded-lg py-4 mt-5"
              containerClassName=""
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}