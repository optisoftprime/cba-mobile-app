// screens/Notification.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigateBack } from 'app/navigate';

export default function Notification() {
  const [filter, setFilter] = useState('all'); // 'all' or 'read'

  const notifications = [
    {
      id: 1,
      icon: 'check-circle',
      title: 'Application Received',
      message: 'Your loan application for ₦150,000 has...',
      time: '2h ago',
      read: false,
    },
    {
      id: 2,
      icon: 'wallet',
      title: 'Disbursed to Wallet',
      message: '₦150,000 has been credited to your wa...',
      time: '5h ago',
      read: false,
    },
    {
      id: 3,
      icon: 'check-circle',
      title: 'Auto Debit Successful',
      message: '₦12,500 has been successfully deducted',
      time: '1d ago',
      read: false,
    },
    {
      id: 4,
      icon: 'gift',
      title: 'Pre-Qualified Offer',
      message: "You're eligible for a ₦200,000 loan based on repayment history",
      time: '2d ago',
      read: false,
    },
    {
      id: 5,
      icon: 'alert-circle',
      title: 'Auto Debit Failed',
      message: 'Your scheduled payment, due to insufficient funds. Please fund your wallet.',
      time: '3d ago',
      read: false,
    },
    {
      id: 6,
      icon: 'check-circle',
      title: 'Application Received',
      message: 'Your loan application for ₦150,000 has...',
      time: '4d ago',
      read: true,
    },
    {
      id: 7,
      icon: 'check-circle',
      title: 'Application Received',
      message: 'Your loan application for ₦150,000 has...',
      time: '5d ago',
      read: true,
    },
    {
      id: 8,
      icon: 'wallet',
      title: 'Disbursed to Wallet',
      message: '₦150,000 has been credited to your wa...',
      time: '6d ago',
      read: true,
    },
    {
      id: 9,
      icon: 'wallet',
      title: 'Disbursed to Wallet',
      message: '₦150,000 has been credited to your wa...',
      time: '1w ago',
      read: true,
    },
  ];

  const getIconColor = (iconName) => {
    switch (iconName) {
      case 'check-circle':
        return '#22C55E';
      case 'wallet':
        return '#157196';
      case 'gift':
        return '#F59E0B';
      case 'alert-circle':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
  };

  const handleBack = () => {
    navigateBack()
  };

  const filteredNotifications =
    filter === 'all' ? notifications : notifications.filter((n) => n.read);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="border-b border-gray-200 px-4 pb-4 pt-12">
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={handleBack}>
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-900">Notification</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Action Buttons */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={handleMarkAllAsRead}
            className="rounded-full bg-purple-100 px-4 py-2">
            <Text className="text-sm font-medium text-purple-700">Mark All as Read</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center rounded-full bg-purple-100 px-4 py-2">
            <Text className="mr-2 text-sm font-medium text-purple-700">Read</Text>
            <MaterialIcons name="keyboard-arrow-down" size={16} color="#7C3AED" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification List */}
      <ScrollView className="flex-1">
        {filteredNotifications.map((notification, index) => (
          <View
            key={notification.id}
            className={`border-b border-gray-100 px-4 py-4 ${!notification.read ? 'bg-blue-50/30' : 'bg-white'}`}>
            <View className="flex-row items-start">
              {/* Icon */}
              <View className="mr-3 mt-1">
                <MaterialCommunityIcons
                  name={notification.icon}
                  size={24}
                  color={getIconColor(notification.icon)}
                />
              </View>

              {/* Content */}
              <View className="flex-1">
                <View className="mb-1 flex-row items-start justify-between">
                  <Text className="flex-1 text-base font-semibold text-gray-900">
                    {notification.title}
                  </Text>
                  <TouchableOpacity className="ml-2">
                    <MaterialIcons name="more-vert" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
                <Text className="text-sm leading-5 text-gray-600" numberOfLines={2}>
                  {notification.message}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}