// screens/Support.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import TouchBtn from 'components/touchBtn';
import { Ionicons } from '@expo/vector-icons';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Support Form Submitted:', {
      name,
      email,
      message,
    });
    // Add your submit logic here
  };

  const handleChatWithUs = () => {
    // console.log('Chat with Us pressed');
    navigateTo("message")
    // Add your chat logic here
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}>
        <Header title="Support" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

        {/* Profile Section */}
        <View className="items-center px-5 py-6">
          <View className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
            <Image
              source={require('../../assets/image 21.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>

          <Text className="mb-4 text-xl font-bold text-gray-900">Sarah Adams</Text>

          {/* Info Box */}
          <View className="w-full rounded-lg bg-[#157196] p-4">
            <Text className="text-center text-sm leading-5 text-white">
              Kindly fill out the form below and we will get back to you as soon as possible
            </Text>
          </View>
        </View>

        {/* Form Section */}
        <View className="px-5">
          {/* Name Field */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email Field */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Email Address <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email address"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Message Field */}
          <View className="mb-6">
            <Text className="mb-2 text-sm font-semibold text-gray-900">
              Message <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={message}
              onChangeText={setMessage}
              placeholder="Enter message"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={{ minHeight: 120 }}
            />
          </View>

          {/* Submit Button */}
          <TouchBtn
            onPress={handleSubmit}
            label="Submit"
            icon={<Ionicons name="paper-plane-outline" size={16} color="white" />}
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4 mb-3"
            activeOpacity={0.8}
            containerClassName=""
          />

          {/* Chat with Us Button */}
          <TouchBtn
            onPress={handleChatWithUs}
            label="Chat with Us"
            icon={<Ionicons name="chatbubble" size={16} color="white" />}
            textClassName="text-base font-semibold text-[#157196]"
            buttonClassName="items-center rounded-lg py-4 border-2 border-[#157196]"
            activeOpacity={0.8}
            variant="outline"
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}
