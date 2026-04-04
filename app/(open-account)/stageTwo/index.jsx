import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import Header from 'components/header';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import Toast from 'react-native-toast-message';
import { trimMessage } from 'helper';
import { accountSetup } from 'api/auth';

export default function IdentityVerification() {
  const params = useLocalSearchParams();
  const [selectedIdType, setSelectedIdType] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('Stage Two params:', params);

  const idTypes = [
    { id: 'National_Identification', label: 'National ID' },
    { id: 'Passport', label: 'International Passport' },
    { id: 'Driver_Licence', label: "Driver's License" },
  ];

  const isFormValid = selectedIdType.length > 0 && uploadedFile !== null;

  const handleChooseFile = () => {
    Alert.alert('Upload Document', 'Choose how to upload your ID', [
      { text: 'Take Photo', onPress: handleCamera },
      { text: 'Choose from Gallery', onPress: handleGallery },
      { text: 'Upload PDF', onPress: handleDocument },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take a photo of your ID.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setUploadedFile(result.assets[0].uri);
  };

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Gallery access is needed to select your ID.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setUploadedFile(result.assets[0].uri);
  };

  const handleDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });
    if (!result.canceled) setUploadedFile(result.assets[0].uri);
  };

  const handleContinue = async () => {
    setIsLoading(true);

    const payload = {
      firstName: params?.firstName,
      lastName: params?.lastName,
      dateOfBirth: params?.dateOfBirth,
      phoneNumber: params?.phoneNumber,
      email: params?.email,
      gender: params?.gender,
      documentType: selectedIdType,
      documentUrl: uploadedFile || '',
      password: params?.password,
      userName: params?.userName,
    };

    console.log('accountSetup payload:', JSON.stringify(payload, null, 2));

    const response = await accountSetup(payload);

    console.log(JSON.stringify(response, null, 2));

    setIsLoading(false);

    if (response?.ok) {
      navigateTo('stageThree', {
        ...params,
        documentType: selectedIdType,
        documentUrl: uploadedFile,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: trimMessage(response?.message),
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View className="px-6 pt-12">
          <View className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <View
              className="h-full rounded-full"
              style={{ width: '33.33%', backgroundColor: Colors?.primary }}
            />
          </View>
          <Text className="mt-2 text-center text-xs text-gray-600">Step 2 of 6</Text>
        </View>

        <Header
          showLeftIcon={true}
          title="Identity Verification"
          subtitle="Verify your identity"
          containerStyle={{ marginTop: -25 }}
        />

        <View className="px-4">
          {/* Info Box */}
          <View className="mb-6 flex-row rounded-lg p-4" style={{ backgroundColor: Colors?.fade }}>
            <MaterialIcons
              name="info-outline"
              size={20}
              color={Colors?.primary}
              className="mt-0.5"
            />
            <Text className="ml-3 flex-1 text-sm text-gray-700">
              We need this to verify your identity and secure your account as required by law.
            </Text>
          </View>

          {/* Select ID Type */}
          <Text className="mb-4 text-sm font-semibold text-gray-900">Select ID Type</Text>

          <View className="mb-6">
            {idTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => {
                  if (isLoading) return;
                  setSelectedIdType(type.id);
                  setUploadedFile(null);
                }}
                className="mb-3 flex-row items-center rounded-lg border px-4 py-4"
                style={{
                  borderColor: selectedIdType === type.id ? Colors?.primary : '#D1D5DB',
                  backgroundColor: selectedIdType === type.id ? Colors?.fade : '#FFFFFF',
                }}>
                <View
                  className="mr-3 h-5 w-5 items-center justify-center rounded-full border-2"
                  style={{ borderColor: selectedIdType === type.id ? Colors?.primary : '#9CA3AF' }}>
                  {selectedIdType === type.id && (
                    <View
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: Colors?.primary }}
                    />
                  )}
                </View>
                <Text
                  className="text-base"
                  style={{
                    color: selectedIdType === type.id ? Colors?.primary : '#111827',
                    fontWeight: selectedIdType === type.id ? '600' : '400',
                  }}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upload Section */}
          {selectedIdType.length > 0 && (
            <View className="mb-8 items-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8">
              <MaterialCommunityIcons
                name={uploadedFile ? 'file-check-outline' : 'upload'}
                size={48}
                color={uploadedFile ? Colors?.primary : '#9CA3AF'}
              />
              <Text className="mb-1 mt-4 text-center text-base font-medium text-gray-900">
                {uploadedFile
                  ? 'File uploaded successfully'
                  : `Upload your ${idTypes.find((t) => t.id === selectedIdType)?.label}`}
              </Text>
              <Text className="mb-6 text-center text-xs text-gray-500">
                JPG, PNG, or PDF (max 5mb)
              </Text>
              <TouchableOpacity
                onPress={handleChooseFile}
                disabled={isLoading}
                className="rounded-lg px-6 py-3"
                style={{ backgroundColor: isLoading ? '#9CA3AF' : Colors?.primary }}>
                <Text className="text-sm font-bold text-white">
                  {uploadedFile ? 'Change File' : 'Choose File'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Continue Button */}
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            isLoading={isLoading}
            loadingText="Please wait..."
            disabled={!isFormValid}
            textClassName="text-base font-bold text-white"
            buttonClassName="w-full items-center rounded-lg py-4"
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
