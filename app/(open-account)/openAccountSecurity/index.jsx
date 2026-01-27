// screens/SetSecurity.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';

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
    navigateTo('stageFive');
    // Navigate to next screen
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View
            className={`h-full rounded-full `}
            style={{ width: '83.33%', backgroundColor: Colors?.primary }}
          />
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
          <View
            className="mb-6 flex-row rounded-lg  p-4"
            style={{ backgroundColor: Colors?.warningFade, borderRadius: 4 }}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color={Colors?.warning}
              className="mt-0.5"
            />
            <View className="ml-3 flex-1">
              <Text className="mb-1 text-sm font-semibold" style={{ color: Colors?.warning }}>
                Keep Your PIN Secure
              </Text>
              <Text className="text-xs leading-5" style={{ color: Colors?.warning }}>
                Never share your PIN with anyone, including bank staff
              </Text>
            </View>
          </View>

          {/* Create PIN */}
          <TextInputComponent
            label="Create PIN"
            placeholder="Enter 4 digit PIN"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={!showPin}
            showPasswordToggle={true}
            onToggleSecureTextEntry={() => setShowPin(!showPin)}
            IconComponent={MaterialCommunityIcons}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* Confirm PIN */}
          <TextInputComponent
            label="Confirm PIN"
            placeholder="Enter 4 digit PIN"
            value={confirmPin}
            onChangeText={setConfirmPin}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry={!showConfirmPin}
            showPasswordToggle={true}
            onToggleSecureTextEntry={() => setShowConfirmPin(!showConfirmPin)}
            IconComponent={MaterialCommunityIcons}
            containerStyle={{ marginBottom: 24 }}
          />

          {/* Biometric Login Info */}
          <View
            className="mb-8 flex-row rounded-lg p-4"
            style={{ backgroundColor: Colors?.fade, borderRadius: 5 }}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={20}
              color={Colors?.primary}
              className="mt-0.5"
            />
            <View className="ml-3 flex-1">
              <Text className="mb-1 text-sm font-semibold " style={{ color: Colors?.primary }}>
                Biometric Login
              </Text>
              <Text className="text-xs leading-5 text-gray-600">
                You can enable faceID after account creation for faster login
              </Text>
            </View>
          </View>
        </View>
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
