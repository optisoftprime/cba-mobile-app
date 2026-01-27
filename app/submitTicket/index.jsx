// screens/SubmitTicket.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from 'components/header';
import Dropdown from 'components/dropDown';
import { navigateBack } from 'app/navigate';

export default function SubmitTicket() {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categoryOptions = [
    { label: 'Account Issues', value: 'account' },
    { label: 'Payment Problems', value: 'payment' },
    { label: 'Technical Support', value: 'technical' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'Other', value: 'other' },
  ];

  const handleChooseFile = () => {
    console.log('Choose file pressed');
    // Implement file picker logic
  };

  const handleSelectCategory = (value) => {
    setCategory(value);
    setIsDropdownOpen(false);
  };

  const handleSendRequest = () => {
    console.log('Send request:', { category, message, attachedFile });
    // Implement send request logic
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Submit a Ticket"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Category Dropdown */}
        <Dropdown
          label="Category"
          placeholder="Select issue category"
          value={category}
          options={categoryOptions}
          onSelect={handleSelectCategory}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        />

        {/* Message */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Message</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Enter message"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900"
            style={{ minHeight: 120 }}
          />
        </View>

        {/* Attach File */}
        <View className="mb-6">
          <Text className="mb-2 text-sm font-semibold text-gray-900">Attach File</Text>
          <TouchableOpacity
            onPress={handleChooseFile}
            className="items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-12">
            <MaterialCommunityIcons name="upload" size={40} color="#9CA3AF" />
            <Text className="mt-3 text-sm text-gray-500">Upload Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View className="px-4 pb-8">
        <TouchableOpacity
          onPress={handleSendRequest}
          className="mb-3 w-full items-center rounded-lg py-4"
          style={{ backgroundColor: '#157196' }}>
          <Text className="text-base font-bold text-white">Send Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          className="w-full items-center rounded-lg border border-gray-300 bg-white py-4">
          <Text className="text-base font-semibold" style={{ color: '#157196' }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}