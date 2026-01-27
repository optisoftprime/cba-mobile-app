// screens/PersonalInformation.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import Dropdown from 'components/dropDown';
import { Ionicons } from '@expo/vector-icons';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function PersonalInformation() {
  const [fullName, setFullName] = useState('Sarah Adams');
  const [dateOfBirth, setDateOfBirth] = useState('12/05/1975');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState(
    '12, johnson Mayowa Street, Mafoluku, Oshodi, Lagos, Nigeria'
  );
  const [bvn, setBvn] = useState('0987654321');
  const [nin, setNin] = useState('0987654321');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleSaveChanges = () => {
    console.log('Saving personal information:', {
      fullName,
      dateOfBirth,
      gender,
      address,
      bvn,
      nin,
    });
  };

  const handleDatePress = () => {
    // In a real app, open a date picker here
    console.log('Open date picker');
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Personal Information"
          onLeftPress={() => {
            navigateTo('appLayout', { screen: 'Profile' });
          }}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Full Name</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Date of Birth */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Date of Birth</Text>
            <TouchableOpacity
              onPress={handleDatePress}
              className="flex-row items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3"
              activeOpacity={0.7}>
              <Text className="text-base text-gray-900">{dateOfBirth}</Text>
              <Ionicons name="calendar-outline" size={20} color={Colors?.primary} />
            </TouchableOpacity>
          </View>

          {/* Gender Dropdown */}
          <Dropdown
            label="Gender"
            placeholder="Select gender"
            value={gender}
            options={genderOptions}
            onSelect={(value) => {
              setGender(value);
              setShowGenderDropdown(false);
            }}
            isOpen={showGenderDropdown}
            onToggle={() => setShowGenderDropdown(!showGenderDropdown)}
          />

          {/* Residential Address */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Residential Address</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={address}
              onChangeText={setAddress}
              placeholder="Enter residential address"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              style={{ minHeight: 80 }}
            />
          </View>

          {/* BVN */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">BVN</Text>
            <View className="rounded-lg bg-gray-200 px-4 py-3">
              <Text className="text-base text-gray-600">{bvn}</Text>
            </View>
          </View>

          {/* NIN */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">NIN</Text>
            <View className="rounded-lg bg-gray-200 px-4 py-3">
              <Text className="text-base text-gray-600">{nin}</Text>
            </View>
          </View>
        </View>

        {/* Save Changes Button - Fixed at Bottom */}
        <View className="px-4 pb-6">
          <TouchBtn
            onPress={handleSaveChanges}
            label="Save Changes"
            textClassName="text-base font-semibold text-white"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
