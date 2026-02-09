// screens/Message.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function Message() {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      text: 'Hello, Good Morning!',
      isUser: false,
      time: '10:30 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 2,
      text: 'Please, are you available',
      isUser: false,
      time: '10:31 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 3,
      text: 'Hello, Good Morning!',
      isUser: true,
      time: '10:35 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 4,
      text: 'Yes, we are available',
      isUser: true,
      time: '10:36 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 5,
      text: 'Hello, Good Morning!',
      isUser: false,
      time: '10:40 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 6,
      text: 'Please, are you available',
      isUser: false,
      time: '10:41 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 7,
      text: 'Hello, Good Morning!',
      isUser: true,
      time: '10:45 AM',
      date: 'Tuesday, 27 January',
    },
    {
      id: 8,
      text: 'Yes, we are available',
      isUser: true,
      time: '10:46 AM',
      date: 'Tuesday, 27 January',
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const renderMessage = (msg, index, showDate) => (
    <View key={msg.id}>
      {showDate && (
        <View className="mb-6 items-center">
          <Text className="text-sm text-gray-600">{msg.date}</Text>
        </View>
      )}

      <View className={`mb-3 flex-row ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
        <View className={`max-w-[75%]`}>
          <View
            className={`rounded-2xl px-4 py-3 ${
              msg.isUser ? 'rounded-tr-none' : 'rounded-tl-none bg-[#D1E7F0]'
            }`}
            style={msg.isUser ? { backgroundColor: '#157196' } : {}}>
            <Text
              className={`text-sm leading-5 ${msg.isUser ? 'text-white' : 'text-gray-900'}`}>
              {msg.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Header
        title="Message"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      {/* Profile Section */}
      <View className="items-center border-b border-gray-200 bg-white px-5 py-6">
        <View className="mb-3 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
          <Image
            source={require('../../assets/image 21.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <Text className="text-lg font-bold text-gray-900">Sarah Adams</Text>
      </View>

      {/* Messages */}
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}>
        {messages.map((msg, index) => {
          const showDate = index === 0 || messages[index - 1].date !== msg.date;
          return renderMessage(msg, index, showDate);
        })}
      </ScrollView>

      {/* Input Area */}
      <View className="border-t border-gray-200 bg-white px-4 py-3">
        <View className="flex-row items-center rounded-full border border-gray-300 bg-white px-4 py-2">
          <TouchableOpacity className="mr-2">
            <Ionicons name="add" size={24} color="#157196" />
          </TouchableOpacity>

          <TextInput
            className="flex-1 text-sm text-gray-900"
            placeholder="Start a message"
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />

          <TouchableOpacity onPress={handleSend} className="ml-2">
            <Ionicons name="send" size={20} color="#157196" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}