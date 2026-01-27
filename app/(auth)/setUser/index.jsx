// screens/SetUsernamePassword.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import TextInputComponent from 'components/textInputs';

export default function SetUsernamePassword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    navigateTo('securityQuestion');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Set your user name and Password"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          subtitle="Kindly provide your preferred user name and password"
        />

        {/* Form Content */}
        <View className="flex-1 px-5 pt-2">
          {/* Username Input */}
          <TextInputComponent
            label="User name"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter user name"
          />

          {/* Password Input */}
          <TextInputComponent
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            showPasswordToggle={true}
            secureTextEntry={!showPassword}
            onToggleSecureTextEntry={() => setShowPassword(!showPassword)}
          />

          {/* Confirm Password Input */}
          <TextInputComponent
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            showPasswordToggle={true}
            secureTextEntry={!showConfirmPassword}
            onToggleSecureTextEntry={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="rounded-lg py-4 items-center"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
