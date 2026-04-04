import React, { useState, useMemo, useRef } from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';
import Dropdown from 'components/dropDown';
import { GlobalStatusBar } from 'config/statusBar';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PersonalInformation() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [touchedPhone, setTouchedPhone] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const maxDOB = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d;
  }, []);

  const formattedDOB = useMemo(() => {
    if (!dateOfBirth) return '';
    const day = String(dateOfBirth.getDate()).padStart(2, '0');
    const month = String(dateOfBirth.getMonth() + 1).padStart(2, '0');
    const year = dateOfBirth.getFullYear();
    return `${day}/${month}/${year}`;
  }, [dateOfBirth]);

  const dobISO = useMemo(() => {
    if (!dateOfBirth) return '';
    return dateOfBirth.toISOString().split('T')[0];
  }, [dateOfBirth]);

  const phoneError =
    touchedPhone && phoneNumber.length > 0 && phoneNumber.length !== 11
      ? 'Phone number must be 11 digits'
      : '';

  const emailError =
    touchedEmail && emailAddress.length > 0 && !EMAIL_REGEX.test(emailAddress)
      ? 'Enter a valid email address'
      : '';

  const confirmPasswordError =
    touchedConfirmPassword && confirmPassword.length > 0 && confirmPassword !== password
      ? 'Passwords do not match'
      : '';

  const isFormValid = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      userName.trim().length > 0 &&
      dateOfBirth !== null &&
      gender.length > 0 &&
      EMAIL_REGEX.test(emailAddress) &&
      phoneNumber.length === 11 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }, [
    firstName,
    lastName,
    userName,
    dateOfBirth,
    gender,
    emailAddress,
    phoneNumber,
    password,
    confirmPassword,
  ]);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (event.type === 'dismissed') return;
    if (selectedDate) setDateOfBirth(selectedDate);
  };

  const handleContinue = () => {
    navigateTo('stageTwo', {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userName: userName.trim(),
      dateOfBirth: dobISO,
      gender,
      email: emailAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      password: password,
    });
  };

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraScrollHeight={20}>
        {/* Progress Bar */}
        <View className="px-6 pb-4 pt-12">
          <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <View
              className="h-full rounded-full"
              style={{ width: '16.66%', backgroundColor: Colors?.primary }}
            />
          </View>
          <Text className="mt-2 text-center text-xs text-gray-600">Step 1 of 6</Text>
        </View>

        <Header
          showLeftIcon={true}
          title="Personal Information"
          subtitle="Tell us about yourself"
          containerStyle={{ marginTop: -40 }}
        />

        <View className="px-4 pt-2">
          <TextInputComponent
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
            containerStyle={{ marginBottom: 24 }}
          />

          <TextInputComponent
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
            containerStyle={{ marginBottom: 24 }}
          />

          <TextInputComponent
            label="Username"
            placeholder="Enter username"
            value={userName}
            onChangeText={(text) => setUserName(text.replace(/\s/g, ''))}
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={{ marginBottom: 24 }}
          />

          <TextInputComponent
            label="Email Address"
            placeholder="Enter email address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            onBlur={() => setTouchedEmail(true)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            containerStyle={{ marginBottom: 24 }}
          />

          <TextInputComponent
            label="Phone Number"
            placeholder="Enter 11-digit phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, '').slice(0, 11))}
            onBlur={() => setTouchedPhone(true)}
            keyboardType="phone-pad"
            maxLength={11}
            error={phoneError}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* Date of Birth */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
            <TextInputComponent
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              value={formattedDOB}
              onChangeText={() => {}}
              editable={false}
              pointerEvents="none"
              iconName="calendar-blank"
              iconPosition="right"
              IconComponent={MaterialCommunityIcons}
              containerStyle={{ marginBottom: 24 }}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth || maxDOB}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={maxDOB}
              onChange={handleDateChange}
            />
          )}

          {showDatePicker && Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              className="mb-4 items-end pr-1">
              <Text style={{ color: Colors?.primary }} className="text-sm font-semibold">
                Done
              </Text>
            </TouchableOpacity>
          )}

          <Dropdown
            label="Gender"
            placeholder="Select gender"
            value={gender}
            options={genderOptions}
            onSelect={setGender}
            isOpen={isGenderOpen}
            onToggle={() => setIsGenderOpen(!isGenderOpen)}
          />

          <View className="mt-6">
            <TextInputComponent
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPasswordToggle
              onToggleSecureTextEntry={() => setShowPassword(!showPassword)}
              containerStyle={{ marginBottom: 24 }}
            />

            <TextInputComponent
              label="Confirm Password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onBlur={() => setTouchedConfirmPassword(true)}
              secureTextEntry={!showConfirmPassword}
              showPasswordToggle
              onToggleSecureTextEntry={() => setShowConfirmPassword(!showConfirmPassword)}
              error={confirmPasswordError}
              containerStyle={{ marginBottom: 24 }}
            />
          </View>
        </View>

        <View className="px-6 pt-8">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            disabled={!isFormValid}
            textClassName="text-base font-bold text-white"
            buttonClassName="w-full items-center rounded-lg py-4 px-4"
            containerClassName=""
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}