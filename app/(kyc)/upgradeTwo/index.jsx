// screens/TierUpgrade.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function TierUpgrade({ route }) {
  const tierName = route?.params?.tierName || 'Tier 2';

  const [formData, setFormData] = useState({
    fullName: 'Sarah Adams',
    phoneNumber: '0987654321',
    address: '12, Jameson Abayomi Street, Iyanapaja, Lagos, Nigeria',
    bvn: '0987654321',
  });

  const handleContinue = () => {
    // Handle form submission
    // console.log('Form submitted', formData);
    navigateTo("upgradeTwoSummary")
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title={`${tierName} Upgrade`}
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Full Name */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">Full Name</Text>
          <View className="rounded-lg bg-gray-50 px-4 py-3">
            <Text className="text-base text-gray-900">{formData.fullName}</Text>
          </View>
        </View>

        {/* Phone Number */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">Phone Number</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
          />
        </View>

        {/* Address */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">Address</Text>
          <View className="rounded-lg bg-gray-50 px-4 py-3">
            <Text className="text-base text-gray-900">{formData.address}</Text>
          </View>
        </View>

        {/* BVN */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">BVN</Text>
          <View className="rounded-lg bg-gray-50 px-4 py-3">
            <Text className="text-base text-gray-900">{formData.bvn}</Text>
          </View>
        </View>

        {/* Take a Selfie */}
        <View className="mb-4">
          <Text className="mb-2 text-sm font-medium text-gray-700">Take a Selfie</Text>
          <View className="items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-12">
            <Ionicons name="camera-outline" size={48} color="#9CA3AF" />
            <Text className="mt-2 text-sm text-gray-500">Take a photo</Text>
          </View>
        </View>

        {/* Upload ID */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Upload a Valid ID (NIN, Drivers License, Passport)
          </Text>
          <View className="items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-12">
            <Ionicons name="cloud-upload-outline" size={48} color="#9CA3AF" />
            <Text className="mt-2 text-sm text-gray-500">Upload Image</Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="mb-6">
          <TouchableOpacity
            onPress={handleContinue}
            className="mb-3 rounded-lg py-4"
            style={{ backgroundColor: Colors.primary }}
            activeOpacity={0.8}>
            <Text className="text-center text-base font-semibold text-white">Continue</Text>
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