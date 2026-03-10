// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from 'expo-router';
import { save, load } from '../config/storage';
import Toast from 'react-native-toast-message';

export default function Layout() {
  const router = useRouter();

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        NavigationBar.setVisibilityAsync('hidden');
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const checkFirstOpen = async () => {
      const app = await load('app');

      if (!app?.hasOpenedBefore) {
        await save('app', { hasOpenedBefore: true });
        router.replace('/onboarding');
        return;
      }

      // Check if user closed app mid-flow
      const appState = await load('appState');

      if (appState?.stage === 'otp') {
        // Resume OTP screen with saved params
        router.replace({
          pathname: '/otp',
          params: {
            phoneNumber: appState?.phoneNumber,
            nextScreen: appState?.nextScreen,
          },
        });
        return;
      }

      setTimeout(() => {
        router.replace('/landingScreen');
      }, 1000);
    };

    checkFirstOpen();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};