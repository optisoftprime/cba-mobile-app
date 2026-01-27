import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';
import  Dropdown  from 'components/dropDown';

export default function PersonalInformation() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  // Dropdown states
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  // Options for dropdowns
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
    { label: 'Prefer not to say', value: 'prefer_not_to_say' },
  ];

  const handleContinue = () => {
    navigateTo('stageTwo');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className={`h-full rounded-full`}
            style={{ width: '16.66%', backgroundColor: Colors?.primary }}
          />
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
        <TextInputComponent
          label="Full Name"
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
          containerStyle={{ marginBottom: 24 }}
        />

        {/* Date of Birth Input */}
        <TextInputComponent
          label="Date of Birth"
          placeholder="dd/mm/yy"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          iconName="calendar-blank"
          iconPosition="right"
          IconComponent={MaterialCommunityIcons}
          containerStyle={{ marginBottom: 24 }}
        />

        {/* Gender Dropdown */}
        <Dropdown
          label="Gender"
          placeholder="Select gender"
          value={gender}
          options={genderOptions}
          onSelect={setGender}
          isOpen={isGenderOpen}
          onToggle={() => setIsGenderOpen(!isGenderOpen)}
        />

        {/* Phone Number Input */}
        <TextInputComponent
          label="Phone Number"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          containerStyle={{ marginBottom: 24 }}
        />

        {/* Email Address Input */}
        <TextInputComponent
          label="Email Address"
          placeholder="Enter email address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{ marginBottom: 32 }}
        />
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8">
        <TouchBtn
          onPress={handleContinue}
          label="Continue"
          textClassName="text-base font-bold text-white"
          buttonClassName="w-full items-center rounded-lg py-4"
          containerClassName=""
        />
      </View>
    </View>
  );
}