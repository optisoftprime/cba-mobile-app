// screens/SupportLegal.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function SupportLegal() {
  const supportOptions = [
    {
      id: 'faq',
      icon: 'help-circle-outline',
      title: 'FAQ',
      subtitle: 'Ask anything you want to know',
      onPress: () => navigateTo('faq'),
    },
    {
      id: 'liveChat',
      icon: 'chatbubbles-outline',
      title: 'Live Chat',
      subtitle: 'Chat with us anytime',
      onPress: () => navigateTo('liveChat'),
    },
    {
      id: 'submitTicket',
      icon: 'ticket-outline',
      title: 'Submit Ticket',
      subtitle: 'Submit any complain to us',
      onPress: () => navigateTo('submitTicket'),
    },
  ];

  return (
    <View className="flex-1">
      <Header
        title="Support & Legal"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingTop: 8 }}
        showsVerticalScrollIndicator={false}>
        
        {/* Support Options */}
        <View className="bg-white">
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.onPress}
              className={`flex-row items-center px-4 py-4 ${
                index !== supportOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              activeOpacity={0.7}>
              {/* Icon */}
              <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Ionicons name={option.icon} size={22} color="#374151" />
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-gray-900">
                  {option.title}
                </Text>
                <Text className="text-xs text-gray-500">{option.subtitle}</Text>
              </View>

              {/* Arrow */}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}