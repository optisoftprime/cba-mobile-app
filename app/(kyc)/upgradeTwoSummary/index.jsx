// screens/TierSummary.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Colors } from 'config/theme';

export default function TierSummary({ route }) {
  const summaryData = {
    fullName: 'Sarah Adams',
    phoneNumber: '09098765432',
    address: '12, Jameson Abayomi Street...',
    bvn: '0987654321',
  };

  const handleSubmit = () => {
    // Handle verification submission
    console.log('Submitting for verification');
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Summary" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <View
          className="mb-6 rounded-xl border border-gray-200 p-4"
          style={{ backgroundColor: '#FBFBFB' }}>
          {/* Full Name */}
          <View className="mb-3 flex-row justify-between">
            <Text className="text-sm text-gray-600">Full Name</Text>
            <Text className="text-sm font-medium text-gray-900">{summaryData.fullName}</Text>
          </View>

          {/* Phone Number */}
          <View className="mb-3 flex-row justify-between">
            <Text className="text-sm text-gray-600">Phone Number</Text>
            <Text className="text-sm font-medium text-gray-900">{summaryData.phoneNumber}</Text>
          </View>

          {/* Address */}
          <View className="mb-3 flex-row justify-between">
            <Text className="text-sm text-gray-600">Address</Text>
            <Text className="text-sm font-medium text-gray-900">{summaryData.address}</Text>
          </View>

          {/* BVN */}
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-600">BVN</Text>
            <Text className="text-sm font-medium text-gray-900">{summaryData.bvn}</Text>
          </View>
        </View>

        {/* Images Section */}
        <View className="mb-6">
          <Text className="mb-3 text-base font-semibold text-gray-900">Images</Text>

          {/* Selfie Image */}
          <View className="mb-4 overflow-hidden rounded-xl">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }}
              className="h-56 w-full"
              resizeMode="cover"
            />
          </View>

          {/* ID Document Image */}
          <View className="overflow-hidden rounded-xl">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400' }}
              className="h-56 w-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Buttons */}
        <View className="mb-6">
          <TouchableOpacity
            onPress={handleSubmit}
            className="mb-3 rounded-lg py-4"
            style={{ backgroundColor: Colors.primary }}
            activeOpacity={0.8}>
            <Text className="text-center text-base font-semibold text-white">
              Submit for Verification
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCancel}
            className="rounded-lg border border-gray-300 bg-white py-4"
            activeOpacity={0.8}>
            <Text className="text-center text-base font-semibold" style={{ color: Colors.primary }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}
