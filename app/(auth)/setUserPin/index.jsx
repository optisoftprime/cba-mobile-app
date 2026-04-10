import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, Image, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import Toast from 'react-native-toast-message';
import { setupTransactionPin } from 'api/auth';
import { getUser } from 'config/storage';

function PinBoxes({ pin, inputRefs, onPinChange, onKeyPress, isLoading }) {
  return (
    <View className="mb-8 flex-row justify-center px-5">
      {pin.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={digit}
          onChangeText={(value) => onPinChange(value, index)}
          onKeyPress={(e) => onKeyPress(e, index)}
          keyboardType="numeric"
          maxLength={1}
          caretHidden={true}
          secureTextEntry={true}
          editable={!isLoading}
          className="mx-2 rounded-lg text-center text-2xl font-bold"
          style={{
            width: 60,
            height: 60,
            backgroundColor: digit ? Colors?.primary : 'white',
            color: digit ? 'white' : Colors?.primary,
            borderWidth: 2,
            borderColor: Colors?.primary,
          }}
        />
      ))}
    </View>
  );
}

export default function SetSecurity() {
  const params = useLocalSearchParams();

  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const pinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (step === 2) {
          goBack();
          return true;
        }
        return false;
      });
      return () => backHandler.remove();
    }, [step])
  );

  const handlePinChange = (value, index, current, setter, refs) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...current];
    updated[index] = value;
    setter(updated);
    if (value && index < 3) refs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e, index, current, setter, refs) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (current[index]) {
        const updated = [...current];
        updated[index] = '';
        setter(updated);
      } else if (index > 0) {
        const updated = [...current];
        updated[index - 1] = '';
        setter(updated);
        refs.current[index - 1]?.focus();
      }
    }
  };

  const handleNext = () => {
    setStep(2);
    setTimeout(() => confirmPinRefs.current[0]?.focus(), 100);
  };

  const goBack = () => {
    setConfirmPin(['', '', '', '']);
    setStep(1);
    setTimeout(() => pinRefs.current[0]?.focus(), 100);
  };

  const handleConfirm = async () => {
    const enteredPin = pin.join('');
    const enteredConfirm = confirmPin.join('');

    if (enteredPin !== enteredConfirm) {
      Toast.show({
        type: 'error',
        text1: 'PINs do not match',
        text2: 'Please make sure both PINs are the same.',
      });
      setConfirmPin(['', '', '', '']);
      confirmPinRefs.current[0]?.focus();
      return;
    }

    const user = await getUser()
    // console.log(user)
    // console.log(user?.data?.data?.accountName)

    setIsLoading(true);

    try {
      const response = await setupTransactionPin(user?.username || user?.data?.data?.accountName, { pin: enteredPin });

      console.log('setupTransactionPin response:', JSON.stringify(response, null, 2));

      if (response?.ok) {
        Toast.show({
          type: 'success',
          text1: 'PIN Set',
          text2: response?.message ?? 'Your transaction PIN has been created.',
        });
        navigateBack()
      } else {
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
          text2: response?.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: error?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>

        <Header
          title={step === 1 ? 'Set Security' : 'Confirm PIN'}
          subtitle={step === 1 ? 'Create a PIN to secure your account' : 'Re-enter your PIN to confirm'}
          showLeftIcon={step === 2}
          onLeftPress={goBack}
        />

        <View className="mb-6 items-center px-5">
          <Image
            source={require('../../../assets/cuate.png')}
            style={{ width: 250, height: 250 }}
            resizeMode="contain"
          />
        </View>

        {step === 1 ? (
          <PinBoxes
            pin={pin}
            inputRefs={pinRefs}
            onPinChange={(value, index) => handlePinChange(value, index, pin, setPin, pinRefs)}
            onKeyPress={(e, index) => handleKeyPress(e, index, pin, setPin, pinRefs)}
            isLoading={false}
          />
        ) : (
          <>
            <PinBoxes
              pin={confirmPin}
              inputRefs={confirmPinRefs}
              onPinChange={(value, index) =>
                handlePinChange(value, index, confirmPin, setConfirmPin, confirmPinRefs)
              }
              onKeyPress={(e, index) =>
                handleKeyPress(e, index, confirmPin, setConfirmPin, confirmPinRefs)
              }
              isLoading={isLoading}
            />
            <TouchableOpacity onPress={goBack} className="mb-6 items-center">
              <Text style={{ color: Colors?.primary }} className="text-sm font-medium">
                ← Back, re-enter PIN
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View className="mt-auto px-5 pb-6 pt-4">
          <TouchBtn
            onPress={step === 1 ? handleNext : handleConfirm}
            label="Continue"
            isLoading={isLoading}
            loadingText="Setting PIN..."
            disabled={
              step === 1
                ? pin.join('').length !== 4
                : confirmPin.join('').length !== 4 || isLoading
            }
            textClassName="text-base font-bold text-white"
            buttonClassName="w-full items-center rounded-lg py-4"
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}