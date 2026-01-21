import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';

export default function IdentityVerification() {
  const [selectedIdType, setSelectedIdType] = useState('national-id');

  const handleContinue = () => {
    console.log('Continue pressed with:', selectedIdType);
    navigateTo('stageThree');
  };

  const handleChooseFile = () => {
    console.log('Choose file pressed');
  };

  const handleTakeSelfie = () => {
    console.log('Take a selfie pressed');
  };

  const idTypes = [
    { id: 'drivers-license', label: "Driver's License" },
    { id: 'national-id', label: 'National ID' },
    { id: 'passport', label: 'Passport' },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Progress Bar */}
      <View className="px-6  pt-12">
        <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-[#157196]" style={{ width: '33.33%' }} />
        </View>
        <Text className="mt-2 text-center text-xs text-gray-600">Step 2 of 6</Text>
      </View>

      <ScrollView className="flex-1">
        <Header
          showLeftIcon={true}
          title="Identity Verification"
          subtitle="Verify your identity"
          containerStyle={{ marginTop: -25 }}
        />

        <View className="px-4">
          {/* Info Box */}
          <View className="mb-6 flex-row rounded-lg bg-blue-50 p-4">
            <MaterialIcons name="info-outline" size={20} color="#157196" className="mt-0.5" />
            <Text className="ml-3 flex-1 text-sm text-gray-700">
              We need this to verify your identity and secure your account as required by law.
            </Text>
          </View>

          {/* Select ID Type */}
          <Text className="mb-4 text-sm font-semibold text-gray-900">Select ID Type</Text>

          {/* ID Type Options */}
          <View className="mb-6">
            {idTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedIdType(type.id)}
                className="mb-3 flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-4">
                <View className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
                  {selectedIdType === type.id && (
                    <View className="h-3 w-3 rounded-full bg-[#157196]" />
                  )}
                </View>
                <Text className="text-base text-gray-900">{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upload Section */}
          <View className="mb-6 items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8">
            <MaterialCommunityIcons name="upload" size={48} color="#9CA3AF" />
            <Text className="mb-1 mt-4 text-center text-base font-medium text-gray-900">
              Upload your National ID
            </Text>
            <Text className="mb-6 text-center text-xs text-gray-500">
              JPG, PNG, or PDF (max 5mb)
            </Text>
            <TouchableOpacity
              onPress={handleChooseFile}
              className="rounded-lg bg-[#157196] px-6 py-3">
              <Text className="text-sm font-bold text-white">Choose File</Text>
            </TouchableOpacity>
          </View>

          {/* Divider with OR */}
          <View className="mb-6 flex-row items-center">
            <View className="flex-1 border-b border-gray-300" />
            <Text className="px-4 text-sm text-gray-500">or</Text>
            <View className="flex-1 border-b border-gray-300" />
          </View>

          {/* Take a Selfie Button */}
          <TouchableOpacity
            onPress={handleTakeSelfie}
            className="mb-6 flex-row items-center justify-center rounded-lg border border-[#157196] bg-white py-4">
            <MaterialIcons name="camera-alt" size={20} color="#157196" />
            <Text className="ml-2 text-base font-semibold text-[#157196]">Take a Selfie</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleContinue}
          className="w-full items-center rounded-lg bg-[#157196] py-4">
          <Text className="text-base font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
