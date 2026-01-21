// screens/SetTransactionPIN.jsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';

export default function SetTransactionPIN() {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handlePinChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    console.log('PIN Value:', newPin.join(''));

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    // const pinValue = pin.join('');
    // console.log('Complete PIN:', pinValue);

    // if (pinValue.length !== 4) {
    //   console.log('Error: Please enter a 4-digit PIN');
    //   return;
    // }

   navigateTo("successScreen")
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Header
          title="Set Transaction PIN"
          onLeftPress={navigateBack}
          color="#0E7490"
          showLeftIcon={true}
        />

        {/* Illustration */}
        <View className="items-center px-5 mb-6">
          <Image
            source={require('../../../assets/cuate.png')} // REPLACE WITH YOUR IMAGE PATH
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>

        {/* Description Text */}
        <View className="px-5 mb-8">
          <Text className="text-center text-sm text-gray-600 leading-5">
            Add an extra layer of protection for your money
          </Text>
        </View>

        {/* PIN Input Boxes */}
        <View className="flex-row justify-center px-5 mb-8">
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              className="text-center text-2xl font-bold rounded-lg mx-2"
              style={{
                width: 60,
                height: 60,
                backgroundColor: digit ? '#0E7490' : 'white',
                color: digit ? 'white' : '#0E7490',
                borderWidth: 2,
                borderColor: '#0E7490',
              }}
            />
          ))}
        </View>

        {/* Continue Button - Fixed at Bottom */}
        <View className="px-5 pb-6 pt-4 mt-auto">
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