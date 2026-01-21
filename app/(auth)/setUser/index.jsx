// screens/SetUsernamePassword.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function SetUsernamePassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    console.log('Going back...');
  };

  const handleContinue = () => {
    // console.log('Username:', username);
    // console.log('Password:', password);
    // console.log('Confirm Password:', confirmPassword);

    // // Validation
    // if (!username.trim()) {
    //   console.log('Error: Username is required');
    //   return;
    // }

    // if (!password) {
    //   console.log('Error: Password is required');
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   console.log('Error: Passwords do not match');
    //   return;
    // }

    // console.log('Proceeding to next step...');
    navigateTo("securityQuestion")
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Header
          title="Set your user name and Password"
          onLeftPress={navigateBack}
          color="#0E7490"
          showLeftIcon={true}
          subtitle="Kindly provide your preferred user name and password"
        />

        {/* Form Content */}
        <View className="flex-1 px-5 pt-2">
          {/* Username Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              User name
            </Text>
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                console.log('Username:', text);
              }}
              placeholder="Enter user name"
              placeholderTextColor="#9CA3AF"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              style={{ 
                borderColor: '#D1D5DB',
                fontSize: 16,
              }}
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Password
            </Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  console.log('Password:', text);
                }}
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base text-gray-900"
                style={{ 
                  borderColor: '#D1D5DB',
                  fontSize: 16,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
                activeOpacity={0.7}>
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#0E7490" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Confirm Password
            </Text>
            <View className="relative">
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  console.log('Confirm Password:', text);
                }}
                placeholder="Confirm password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                className="border border-gray-300 rounded-lg px-4 py-3 pr-12 text-base text-gray-900"
                style={{ 
                  borderColor: '#D1D5DB',
                  fontSize: 16,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3"
                activeOpacity={0.7}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color="#0E7490" 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4">
          <TouchableOpacity
            onPress={handleContinue}
            className="rounded-lg py-4 items-center bg-[#0E7490]"
            activeOpacity={0.8}>
            <Text className="text-white text-base font-semibold">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}