// screens/RegistrationForm.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import TextInputComponent from 'components/textInputs';
import { GlobalStatusBar } from 'config/statusBar';

export default function RegistrationForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleContinue = () => {
    console.log('Account Number:', accountNumber);
    console.log('Terms Agreed:', isAgreed);
    navigateTo('otp');
  };

  const toggleCheckbox = () => {
    setIsAgreed(!isAgreed);
    console.log('Checkbox toggled:', !isAgreed);
  };

  return (
    <View className="flex-1" style={{backgroundColor:Colors?.background}}>
      <GlobalStatusBar style="dark-content" />
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
          {/* Account Number Input - Remove the wrapper mb-6 since component adds it */}
          <TextInputComponent
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter account number"
            keyboardType="numeric"
            // The component already adds mb-6 (24px) margin, so don't wrap it in another mb-6
          />

          {/* Terms & Conditions Checkbox */}
          <TouchableOpacity
            onPress={toggleCheckbox}
            className="mb-6 flex-row items-start"
            activeOpacity={0.7}>
            <View
              className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded"
              style={{
                backgroundColor: isAgreed ? Colors?.primary : 'white',
                borderWidth: 2,
                borderColor: isAgreed ? Colors?.primary : '#D1D5DB',
              }}>
              {isAgreed && <Ionicons name="checkmark" size={14} color="white" />}
            </View>
            <Text className="flex-1 text-sm leading-5 text-gray-700">
              By registering you agree to Ezone&apos;s Banking{' '}
              <Text style={{ color: Colors?.primary }}>Terms & Private Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
