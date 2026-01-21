import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';

export default function PersonalInformation() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleContinue = () => {
    navigateTo('stageTwo');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-[#157196]" style={{ width: '16.66%' }} />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 1 of 6</Text>
      </View>
      <Header
        showLeftIcon={true}
        title="Personal Information"
        subtitle={'Tell us about yourself'}
        containerStyle={{ marginTop: -40 }}
      />

      <ScrollView className="flex-1 px-4">
        {/* Full Name Input */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Full Name</Text>
          <TextInput
            className="rounded-lg border border-gray-300 px-4 py-3 text-base"
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Date of Birth Input */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Date of Birth</Text>
          <View className="relative">
            <TextInput
              className="rounded-lg border border-gray-300 px-4 py-3 text-base"
              placeholder="dd/mm/yy"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#9CA3AF"
            />
            <View className="absolute right-4 top-3">
              <MaterialCommunityIcons name="calendar-blank" size={20} color="#157196" />
            </View>
          </View>
        </View>

        {/* Gender Dropdown */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Gender</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
            <Text className="text-base text-gray-400">Select gender</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Phone Number Input */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Phone Number</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
            <Text className="text-base text-gray-400">Enter phone number</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Email Address Input */}
        <View className="mb-8">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Email Address</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
            <Text className="text-base text-gray-400">Enter email address</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#6B7280" />
          </TouchableOpacity>
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
