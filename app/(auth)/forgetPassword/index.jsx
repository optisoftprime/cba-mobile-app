// screens/ForgetPassword.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    navigateTo("otp",{nextScreen:"resetPassword"})
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Forget Password"
          onLeftPress={() => {
            navigateBack();
          }}
          showLeftIcon={true}
        />

        {/* Form Content */}
        <View className="flex-1 px-5 ">
          {/* Subtitle */}
          <Text className="mb-5 text-base text-gray-600">
            Enter your email address to reset passwordy
          </Text>

          {/* Email Input */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                console.log('Email Input:', text);
              }}
              placeholder="Enter your email address"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900"
              style={{
                borderColor: '#D1D5DB',
                fontSize: 16,
              }}
            />
          </View>
        </View>

        {/* Buttons - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4">
          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="mb-3 items-center rounded-lg bg-[#0E7490] py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            onPress={handleCancel}
            className="items-center rounded-lg border border-gray-300 py-4"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-[#0E7490]">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
