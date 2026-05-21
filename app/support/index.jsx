// screens/SupportLegal.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
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
      onPress: () => navigateTo('support'),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Support & Legal"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mt-4 gap-y-3 px-4">
          {supportOptions.map((item) => (
            <View
              key={item.id}
              style={
                Platform.OS === 'android'
                  ? {
                      borderRadius: 16,
                      backgroundColor: 'white',
                      elevation: 2,
                      shadowColor: '#E5E7EB',
                    }
                  : {
                      borderRadius: 16,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 4,
                    }
              }>
              <TouchableOpacity
                onPress={item.onPress}
                className="flex-row items-center rounded-2xl bg-white px-4 py-4"
                style={{
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                activeOpacity={0.7}>
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Ionicons name={item.icon} size={20} color="#374151" />
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-gray-900">{item.title}</Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {item.subtitle}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}