// screens/EnterPIN.jsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import { useLocalSearchParams } from 'expo-router';
import { FaceIdSmallIcon } from 'svgs/faceIdSvg';

export default function EnterPIN() {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const params = useLocalSearchParams();

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
    const pinValue = pin.join('');
    console.log('Complete PIN:', pinValue);

    if (pinValue.length !== 4) {
      console.log('Error: Please enter complete PIN');
      return;
    }

    console.log('Verifying PIN...');
    navigateTo(params?.nextScreen || 'dashboard');
  };

  const handleFaceID = () => {
    console.log('Face ID authentication');
    // Implement Face ID logic here
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          title="Enter Pin"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          subtitle={"Enter your 4 digit pin"}
        />

        

        {/* PIN Input Boxes */}
        <View className="mb-8 flex-row justify-center px-5">
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
              className="mx-2 rounded-2xl text-center text-2xl font-bold"
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

        {/* Face ID Button */}
        <View className="mb-8 items-center">
          <TouchableOpacity 
            onPress={handleFaceID}
            className="flex-row items-center">
            <Text className="text-sm font-medium text-[#0E7490] flex flex-row justify-center items-center gap-2"><FaceIdSmallIcon/> Face ID</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View className="mt-auto px-5 pb-6">
          <TouchableOpacity
            onPress={handleContinue}
            className="items-center rounded-lg py-4"
            style={{ backgroundColor: '#0E7490' }}
            activeOpacity={0.8}>
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}