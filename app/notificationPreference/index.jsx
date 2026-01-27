// screens/NotificationPreference.jsx
import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationPreference() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleTogglePush = (value) => {
    setPushEnabled(value);
    console.log('Push notification enabled:', value);
  };

  const handleToggleSMS = (value) => {
    setSmsEnabled(value);
    console.log('SMS alert enabled:', value);
  };

  const handleToggleEmail = (value) => {
    setEmailEnabled(value);
    console.log('Email update enabled:', value);
  };

  const NotificationItem = ({ iconName, title, description, value, onValueChange }) => (
    <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-4">
      {/* Left Side - Icon and Text */}
      <View className="flex-1 flex-row items-center">
        <View className="mr-4 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Ionicons name={iconName} size={22} color="#374151" />
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-base font-semibold text-gray-900">
            {title}
          </Text>
          <Text className="text-xs text-gray-500">
            {description}
          </Text>
        </View>
      </View>

      {/* Right Side - Toggle Switch */}
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D5DB', true: '#10B981' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
      />
    </View>
  );

  return (
    <View className="flex-1">
      <Header
        title="Notification Preference"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <View className="mt-2 bg-white">
        <NotificationItem
          iconName="notifications-outline"
          title="Push Notification"
          description="Get notification alerts"
          value={pushEnabled}
          onValueChange={handleTogglePush}
        />
        <NotificationItem
          iconName="chatbox-outline"
          title="SMS Alert"
          description="Get sms alerts"
          value={smsEnabled}
          onValueChange={handleToggleSMS}
        />
        <NotificationItem
          iconName="mail-outline"
          title="Email Update"
          description="Get email update"
          value={emailEnabled}
          onValueChange={handleToggleEmail}
        />
      </View>
    </View>
  );
}