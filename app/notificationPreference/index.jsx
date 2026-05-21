// screens/NotificationPreference.jsx
import React, { useCallback, useRef } from 'react';
import { View, Text, Switch, ScrollView, Platform } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotificationPreferences, updateUserNotificationPreferences } from 'api/userProfile';
import Toast from 'react-native-toast-message';

const DEBOUNCE_MS = 600;

function NotificationItem({ iconName, title, description, value, onValueChange }) {
  return (
    <View
      style={
        Platform.OS === 'android'
          ? { borderRadius: 16, backgroundColor: 'white', elevation: 2, shadowColor: '#E5E7EB' }
          : { borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4 }
      }>
      <View
        className="flex-row items-center bg-white px-4 py-4"
        style={{ borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 16, overflow: 'hidden' }}>
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
          <Ionicons name={iconName} size={20} color="#374151" />
        </View>
        <View className="flex-1">
          <Text className="mb-0.5 text-base font-semibold text-gray-900">{title}</Text>
          <Text className="text-xs text-gray-500" numberOfLines={1}>{description}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#D1D5DB', true: '#10B981' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#D1D5DB"
        />
      </View>
    </View>
  );
}

function SkeletonItem() {
  return (
    <View
      style={
        Platform.OS === 'android'
          ? { borderRadius: 16, backgroundColor: 'white', elevation: 2, shadowColor: '#E5E7EB' }
          : { borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4 }
      }>
      <View
        className="flex-row items-center bg-white px-4 py-4"
        style={{ borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 16, overflow: 'hidden' }}>
        <View className="mr-3 h-10 w-10 rounded-lg bg-gray-100" />
        <View className="flex-1 gap-y-2">
          <View className="h-3.5 w-32 rounded-md bg-gray-100" />
          <View className="h-2.5 w-20 rounded-md bg-gray-100" />
        </View>
        <View className="h-6 w-11 rounded-full bg-gray-100" />
      </View>
    </View>
  );
}

export default function NotificationPreference() {
  const queryClient = useQueryClient();
  const debounceTimers = useRef({});

  const { data, isLoading } = useQuery({
    queryKey: ['notificationPreferences'],
    queryFn: async () => {
      const result = await fetchNotificationPreferences();
      if (!result.ok) throw new Error(result.message);
      return result.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      const result = await updateUserNotificationPreferences(null, payload);
      if (!result.ok) {
        Toast?.show({ type: "error", text1: "An Error Occured", text2: result?.message || "something went wrong" })
      };
      return result.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['notificationPreferences'] });
      const previous = queryClient.getQueryData(['notificationPreferences']);
      queryClient.setQueryData(['notificationPreferences'], (old) => ({
        ...old,
        pushNotification: payload.pushNotification,
        sendSmsNotification: payload.smsNotification,
        sendEmailNotification: payload.emailNotification,
      }));
      return { previous };
    },
    onError: (_err, _payload, context) => {
      queryClient.setQueryData(['notificationPreferences'], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationPreferences'] });
    },
  });

  const handleToggle = useCallback((field, value) => {
    queryClient.setQueryData(['notificationPreferences'], (old) => ({ ...old, [field]: value }));

    if (debounceTimers.current[field]) clearTimeout(debounceTimers.current[field]);

    debounceTimers.current[field] = setTimeout(() => {
      const prefs = queryClient.getQueryData(['notificationPreferences']);
      mutate({
        pushNotification: prefs?.pushNotification ?? true,
        smsNotification: prefs?.sendSmsNotification ?? true,
        emailNotification: prefs?.sendEmailNotification ?? true,
      });
    }, DEBOUNCE_MS);
  }, [mutate, queryClient]);

  const items = [
    {
      id: 'push',
      iconName: 'notifications-outline',
      title: 'Push Notification',
      description: 'Get notification alerts',
      field: 'pushNotification',
      value: data?.pushNotification ?? true,
    },
    {
      id: 'sms',
      iconName: 'chatbox-outline',
      title: 'SMS Alert',
      description: 'Get SMS alerts',
      field: 'sendSmsNotification',
      value: data?.sendSmsNotification ?? true,
    },
    {
      id: 'email',
      iconName: 'mail-outline',
      title: 'Email Update',
      description: 'Get email updates',
      field: 'sendEmailNotification',
      value: data?.sendEmailNotification ?? true,
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Notification Preference"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView className="mt-4 flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="gap-y-3">
          {isLoading
            ? [1, 2, 3].map((k) => <SkeletonItem key={k} />)
            : items.map((item) => (
              <NotificationItem
                key={item.id}
                iconName={item.iconName}
                title={item.title}
                description={item.description}
                value={item.value}
                onValueChange={(val) => handleToggle(item.field, val)}
              />
            ))}
        </View>
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}