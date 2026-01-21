// screens/AccountSecured.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigateTo } from 'app/navigate';

export default function AccountSecured() {
  const handleGoToDashboard = () => {
   navigateTo("landingScreen")
  };

  return (
    <View className="flex-1 bg-white justify-center items-center px-8">
      {/* Success Icon */}
      <View className="mb-8">
        <View 
          className="w-32 h-32 rounded-full items-center justify-center"
          style={{ 
            backgroundColor: '#10B981',
            borderWidth: 8,
            borderColor: '#D1FAE5',
          }}>
          <Ionicons name="checkmark" size={60} color="white" />
        </View>
      </View>

      {/* Success Message */}
      <Text className="text-center text-base text-gray-600 leading-6 mb-16 px-4">
        Your account is now secured and ready for use
      </Text>

      {/* Go to Dashboard Button - Fixed at Bottom */}
      <View className="absolute bottom-6 left-8 right-8">
        <TouchableOpacity
          onPress={handleGoToDashboard}
          className="items-center rounded-lg py-4"
          style={{ backgroundColor: '#0E7490' }}
          activeOpacity={0.8}>
          <Text className="text-base font-semibold text-white">
            Go to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
