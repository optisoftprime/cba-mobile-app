// screens/Action.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { navigateBack, navigateReplace } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import ConfirmDangerModal from 'components/modals/confirmModal';
import { logout, deactivateUser } from 'api/userProfile';
import { clearAll } from 'config/storage';

export default function Action() {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    // Toast.show({
    //   type: 'info',
    //   text1: 'Logging Out',
    //   text2: 'Please wait...',
    //   autoHide: false,
    // });

    const result = await logout(null, {});

    if (result.ok) {
      await clearAll();
      Toast.hide();
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been logged out successfully.',
      });
      setIsLoggingOut(false);
      setLogoutModalVisible(false);
      navigateReplace('landingScreen');
    } else {
      Toast.hide();
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: result.message || 'Something went wrong. Please try again.',
      });
      setIsLoggingOut(false);
    }
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);

    // Toast.show({
    //   type: 'info',
    //   text1: 'Deactivating Account',
    //   text2: 'Please wait...',
    //   autoHide: false,
    // });

    const result = await deactivateUser(null, {});

    if (result.ok) {
      await clearAll();
      Toast.hide();
      Toast.show({
        type: 'success',
        text1: 'Account Deactivated',
        text2: 'Your account has been deactivated.',
      });
      setIsDeactivating(false);
      setDeactivateModalVisible(false);
      navigateReplace('landingScreen');
    } else {
      Toast.hide();
      Toast.show({
        type: 'error',
        text1: 'Deactivation Failed',
        text2: result.message || 'Something went wrong. Please try again.',
      });
      setIsDeactivating(false);
    }
  };

  const actions = [
    {
      id: 'logout',
      icon: 'log-out-outline',
      title: 'Log Out',
      subtitle: 'Log out your account',
      onPress: () => setLogoutModalVisible(true),
    },
    {
      id: 'deactivate',
      icon: 'close-circle-outline',
      title: 'Deactivate Account',
      subtitle: 'Deactivate your account',
      onPress: () => setDeactivateModalVisible(true),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header title="Action" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <ScrollView className="mt-4 flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="gap-y-3">
          {actions.map((action) => (
            <View
              key={action.id}
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
                onPress={action.onPress}
                className="flex-row items-center rounded-2xl bg-white px-4 py-4"
                style={{
                  borderWidth: 1,
                  borderColor: '#F3F4F6',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
                activeOpacity={0.7}>
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Ionicons name={action.icon} size={20} color="#374151" />
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-gray-900">
                    {action.title}
                  </Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {action.subtitle}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="h-6" />
      </ScrollView>

      {/* Logout confirmation */}
      <ConfirmDangerModal
        visible={logoutModalVisible}
        onClose={() => !isLoggingOut && setLogoutModalVisible(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
        icon="log-out-outline"
        title="Log Out?"
        subtitle="You will be signed out of your account and redirected to the login screen."
        confirmLabel="Log Out"
        cancelLabel="Cancel"
      />

      {/* Deactivate confirmation */}
      <ConfirmDangerModal
        visible={deactivateModalVisible}
        onClose={() => !isDeactivating && setDeactivateModalVisible(false)}
        onConfirm={handleDeactivate}
        isLoading={isDeactivating}
        icon="close-circle-outline"
        title="Deactivate Account?"
        subtitle="Your account will be disabled immediately. You will need to contact support to reactivate it."
        confirmLabel="Yes, Deactivate"
        cancelLabel="Cancel"
      />
    </View>
  );
}