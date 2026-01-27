// screens/LiveChat.jsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function LiveChat() {
  const [message, setMessage] = useState('');

  const messages = [
    {
      id: 1,
      text: 'Hello, how can we help you today?',
      isSupport: true,
      time: '10:30 AM',
      date: 'Today',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices odio nibh erat curabitur.',
      isSupport: false,
      time: '10:32 AM',
      date: 'Today',
    },
    {
      id: 3,
      text: 'Hello, how can we help you today?',
      isSupport: true,
      time: '10:35 AM',
      date: 'Today',
    },
    {
      id: 4,
      text: 'Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices odio nibh erat curabitur.',
      isSupport: false,
      time: '10:37 AM',
      date: 'Today',
    },
    {
      id: 5,
      text: 'Hello, how can we help you today?',
      isSupport: true,
      time: '10:40 AM',
      date: 'Today',
    },
    {
      id: 6,
      text: 'Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices odio nibh erat curabitur.',
      isSupport: false,
      time: '10:42 AM',
      date: 'Today',
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Add logic to send message
    }
  };

  const renderMessage = (msg, index, showDate) => (
    <View key={msg.id}>
      {/* Date Separator */}
      {showDate && (
        <View className="mb-4 items-center">
          <View className="rounded-xl bg-gray-200 px-3 py-1">
            <Text className="text-xs text-gray-600">{msg.date}</Text>
          </View>
        </View>
      )}

      {/* Message */}
      <View className={`mb-3 flex-row ${msg.isSupport ? 'justify-start' : 'justify-end'}`}>
        {msg.isSupport && (
          <View className="mr-2 h-10 w-10 items-center justify-center rounded-full" >
            <Image 
              source={require('../../assets/image 21.png')} 
              className="h-10 w-10 rounded-full"
              defaultSource={<Ionicons name="person" size={20} color="white" />}
            />
          </View>
        )}
        
        <View className={`max-w-[75%] ${msg.isSupport ? '' : 'items-end'}`}>
          <View 
            className={`rounded-2xl px-4 py-3 ${
              msg.isSupport 
                ? 'rounded-tl-none' 
                : 'rounded-tr-none bg-gray-200'
            }`}
            style={msg.isSupport ? { backgroundColor: '#157196' } : {}}>
            <Text className={`text-sm leading-5 ${
              msg.isSupport ? 'text-white' : 'text-gray-900'
            }`}>
              {msg.text}
            </Text>
          </View>
          <Text className="mt-1 text-xs text-gray-500">{msg.time}</Text>
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
        title="Live Chat"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      {/* Messages */}
      <ScrollView 
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}>
        
        {messages.map((msg, index) => {
          const showDate = index === 0 || messages[index - 1].date !== msg.date;
          return renderMessage(msg, index, showDate);
        })}
      </ScrollView>

      {/* Input Area */}
      <View className="border-t border-gray-200 bg-white px-4 py-3">
        <View className="flex-row items-center">
          <View className="mr-2 flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-2">
            <TextInput
              className="flex-1 text-sm text-gray-900"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="happy-outline" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            onPress={handleSend}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: '#157196' }}
            activeOpacity={0.7}>
            <Ionicons name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}