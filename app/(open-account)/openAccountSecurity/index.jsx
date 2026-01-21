// screens/SetSecurity.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';

export default function SetSecurity() {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleContinue = () => {
    // if (pin.length !== 4) {
    //   console.log('Error: PIN must be 4 digits');
    //   return;
    // }

    // if (pin !== confirmPin) {
    //   console.log('Error: PINs do not match');
    //   return;
    // }

    // console.log('PIN set successfully:', pin);
    navigateTo("stageFive")
    // Navigate to next screen
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-[#157196]" style={{ width: '83.33%' }} />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 5 of 6</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Header */}
        <Header
          title="Set Security"
          subtitle="Create a PIN to secure account"
          showLeftIcon={true}
          containerStyle={{ marginTop: -30 }}
        />

        <View className="px-4">
          {/* Warning Box */}
          <View className="mb-6 flex-row rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            <MaterialIcons name="info-outline" size={20} color="#D97706" className="mt-0.5" />
            <View className="ml-3 flex-1">
              <Text className="mb-1 text-sm font-semibold text-gray-900">Keep Your PIN Secure</Text>
              <Text className="text-xs leading-5 text-gray-600">
                Never share your PIN with anyone, including bank staff
              </Text>
            </View>
          </View>

          {/* Create PIN */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Create PIN</Text>
            <View className="relative">
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3 pr-12 text-base"
                placeholder="Enter 4 digit PIN"
                value={pin}
                onChangeText={setPin}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={!showPin}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowPin(!showPin)}
                className="absolute right-4 top-3">
                <MaterialCommunityIcons
                  name={showPin ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm PIN */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Confirm PIN</Text>
            <View className="relative">
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3 pr-12 text-base"
                placeholder="Enter 4 digit PIN"
                value={confirmPin}
                onChangeText={setConfirmPin}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={!showConfirmPin}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-4 top-3">
                <MaterialCommunityIcons
                  name={showConfirmPin ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Biometric Login Info */}
          <View className="mb-8 flex-row rounded-lg bg-blue-50 p-4">
            <MaterialCommunityIcons
              name="fingerprint"
              size={20}
              color="#157196"
              className="mt-0.5"
            />
            <View className="ml-3 flex-1">
              <Text className="mb-1 text-sm font-semibold text-[#157196]">Biometric Login</Text>
              <Text className="text-xs leading-5 text-gray-600">
                You can enable faceID after account creation for faster login
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full items-center rounded-lg bg-[#157196] py-4">
          <Text className="text-base font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
