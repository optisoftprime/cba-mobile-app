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
import { initiate } from 'api/auth';
import Toast from 'react-native-toast-message';

export default function RegistrationForm() {
  const [accountNumber, setAccountNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFormReady = accountNumber.replace(/\s/g, '').length === 10 && isAgreed;

  const handleContinue = async () => {
    setIsLoading(true);
    const cleanedAccountNumber = accountNumber.replace(/\s/g, '').trim();
    const response = await initiate(null, { accountNumber: cleanedAccountNumber });

    if (response?.ok) {
      const phoneNumber = response?.data?.data?.phoneNumber;
      navigateTo('otp', { phoneNumber, nextScreen: 'registrationSteps' });
    } else {
      Toast.show({ type: 'error', text1: 'Failed', text2: response?.message || 'Something went wrong' });
    }

    setIsLoading(false);
  };

  const toggleCheckbox = () => setIsAgreed(!isAgreed);

  function goBack() {
    navigateBack();
  }

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header title="Registration" onLeftPress={goBack} showLeftIcon={true} />

        <View className="flex-1 px-5">
          <TextInputComponent
            label="Account Number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter account number"
            keyboardType="numeric"
            maxLength={10}
            isLoading={isLoading}
          />

          <TouchableOpacity
            onPress={toggleCheckbox}
            className="mb-6 flex-row items-start"
            activeOpacity={0.7}
            disabled={isLoading}>
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

        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            isLoading={isLoading}
            loadingText="Please wait..."
            disabled={!isFormReady}
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