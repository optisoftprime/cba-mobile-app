// screens/Congratulations.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { navigateTo } from 'app/navigate';

export default function Congratulations() {
  const accountNumber = '1234567890';

  const handleCopyAccountNumber = () => {
    console.log('Account number copied:', accountNumber);
    // Implement clipboard copy functionality
  };

  const handleGoToDashboard = () => {
    // console.log('Navigate to dashboard');
    navigateTo("appLayout")
    // Navigate to dashboard
  };

  const handleDownloadDetails = () => {
    console.log('Download account details');
    // Download account details
  };

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6 pb-4 pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-[#157196]" style={{ width: '100%' }} />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 6 of 6</Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center px-6 pt-8">
        {/* Celebration Icon */}
        <View className="mb-6">
          <Image
            source={require('../../../assets/image 77.png')} 
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
          Congratulations!
        </Text>

        {/* Subtitle */}
        <Text className="mb-8 text-center text-base leading-6 text-gray-600">
          Your account has been created successfully
        </Text>

        {/* Account Number Card with Gradient */}
        <LinearGradient
          colors={['#3AA6A6', '#257B9E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="mb-6 w-full rounded-2xl p-6">
          <Text className="mb-4 text-center text-sm font-medium text-white">
            Your Account Number
          </Text>
          <TouchableOpacity
            onPress={handleCopyAccountNumber}
            className="mb-4 flex-row items-center justify-center">
            <MaterialCommunityIcons name="content-copy" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-center text-xs text-white/80">
            Save this for your records
          </Text>
        </LinearGradient>

        {/* Checklist */}
        <View className="mb-8 w-full rounded-lg bg-blue-50 p-4">
          <View className="mb-3 flex-row items-center">
            <MaterialIcons name="check-circle" size={20} color="#22C55E" />
            <Text className="ml-3 text-sm text-gray-700">Identity verified</Text>
          </View>
          <View className="mb-3 flex-row items-center">
            <MaterialIcons name="check-circle" size={20} color="#22C55E" />
            <Text className="ml-3 text-sm text-gray-700">Phone number verified</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="check-circle" size={20} color="#22C55E" />
            <Text className="ml-3 text-sm text-gray-700">Security PIN created</Text>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="px-6 pb-8">
        {/* Go to Dashboard Button */}
        <TouchableOpacity
          onPress={handleGoToDashboard}
          className="mb-3 w-full items-center rounded-lg bg-[#157196] py-4">
          <Text className="text-base font-bold text-white">Go to Dashboard</Text>
        </TouchableOpacity>

        {/* Download Account Details Button */}
        <TouchableOpacity
          onPress={handleDownloadDetails}
          className="w-full items-center rounded-lg border-2 border-[#157196] bg-white py-4">
          <Text className="text-base font-bold text-[#157196]">Download Account Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}