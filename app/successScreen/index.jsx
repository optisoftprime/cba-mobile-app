// screens/AccountSecured.jsx
import React, { useCallback } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo, navigateBack, navigateReplace } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { GlobalStatusBar } from 'config/statusBar';

export default function AccountSecured() {
  const params = useLocalSearchParams();

  const handleContinue = () => {
    if (params?.nextScreen) {
      navigateReplace(params.nextScreen);
    } else {
      navigateReplace('landingScreen');
    }
  };

  const handleBack = () => {
    if (params?.backScreen) {
      navigateReplace(params.backScreen);
    } else {
      navigateReplace('landingScreen');
    }
  };

  // add inside component
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        handleBack();
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

  return (
    <View
      className="flex-1 items-center justify-center px-8"
      style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />

      {/* Success Icon */}
      <View className="mb-8">
        <View
          className="h-32 w-32 items-center justify-center rounded-full"
          style={{
            backgroundColor: Colors?.primary,
            borderWidth: 8,
            borderColor: Colors?.accent,
          }}>
          <Ionicons name="checkmark" size={60} color="white" />
        </View>
      </View>

      {/* Success Message */}
      <Text className="mb-16 px-4 text-center text-base leading-6 text-gray-600">
        {params?.message || 'Action completed successfully'}
      </Text>

      {/* Buttons */}
      <View className="absolute bottom-6 left-8 right-8">
        <TouchBtn
          onPress={handleContinue}
          label={params?.nextScreen ? 'Continue' : 'Go to Dashboard'}
          textClassName="text-base font-semibold"
          buttonClassName="items-center rounded-lg py-4"
          activeOpacity={0.8}
          containerClassName=""
        />
      </View>
    </View>
  );
}
