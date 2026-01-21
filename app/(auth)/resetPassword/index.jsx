import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    navigateTo('landingScreen');
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
        <Header title="Reset Your Password" onLeftPress={navigateBack} showLeftIcon />

        {/* Form Content */}
        <View className="flex-1 px-5">
          {/* Subtitle */}
          <Text className="mb-6 text-base text-gray-600">
            The password must be different than before
          </Text>

          {/* Illustration */}
          <View className="mb-6 items-center">
            <Image
              source={require('../../../assets/pana.png')}
              className="h-56 w-full"
              resizeMode="contain"
            />
          </View>

          {/* New Password Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">New Password</Text>
            <View className="flex-row items-center rounded-lg border  border-gray-300 bg-white px-3">
              <TextInput
                className="flex-1 text-base text-gray-900 "
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                activeOpacity={0.6}>
                <Ionicons name={showNewPassword ? 'eye' : 'eye-off'} size={20} color="#0E7490" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Confirm Password</Text>
            <View className="flex-row items-center rounded-lg border  border-gray-300 bg-white px-3">
              <TextInput
                className="flex-1 text-base text-gray-900"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.6}>
                <Ionicons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#0E7490"
                />
              </TouchableOpacity>
            </View>
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
