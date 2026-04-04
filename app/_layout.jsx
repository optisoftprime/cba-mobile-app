// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { save, load } from '../config/storage';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

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

      const appState = await load('appState');

      if (appState?.stage) {
        router.replace({
          pathname: `/${appState.stage}`,
          params: appState?.params,
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
    <QueryClientProvider client={queryClient}>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </QueryClientProvider>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};
