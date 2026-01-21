// screens/RegistrationForm.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function RegistrationForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleContinue = () => {
    console.log('Account Number:', accountNumber);
    console.log('Terms Agreed:', isAgreed);

    // // Validation
    // if (!accountNumber.trim()) {
    //   console.log('Error: Account number is required');
    //   return;
    // }

    // if (!isAgreed) {
    //   console.log('Error: Must agree to terms');
    //   return;
    // }

    // Navigate to next step
    navigateTo('otp');
    console.log('Proceeding to next step...');
  };

  const toggleCheckbox = () => {
    setIsAgreed(!isAgreed);
    console.log('Checkbox toggled:', !isAgreed);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Registration"
          onLeftPress={() => {
            navigateBack();
          }}
          showLeftIcon={true}
        />

        {/* Form Content */}
        <View className="flex-1 px-5">
          {/* Account Number Input */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Account Number</Text>
            <TextInput
              value={accountNumber}
              onChangeText={(text) => {
                setAccountNumber(text);
                console.log('Account Number Input:', text);
              }}
              placeholder="Enter account number"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              className="rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900"
              style={{
                borderColor: '#D1D5DB',
                fontSize: 16,
              }}
            />
          </View>

          {/* Terms & Conditions Checkbox */}
          <TouchableOpacity
            onPress={toggleCheckbox}
            className="mb-6 flex-row items-start"
            activeOpacity={0.7}>
            <View
              className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded"
              style={{
                backgroundColor: isAgreed ? '#0E7490' : 'white',
                borderWidth: 2,
                borderColor: isAgreed ? '#0E7490' : '#D1D5DB',
              }}>
              {isAgreed && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text className="flex-1 text-sm leading-5 text-gray-700">
              By registering you agree to Ezone's Banking{' '}
              <Text style={{ color: '#0E7490' }}>Terms & Private Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4">
          <TouchableOpacity
            onPress={handleContinue}
            className="items-center rounded-lg py-4 bg-[#0E7490]"
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
