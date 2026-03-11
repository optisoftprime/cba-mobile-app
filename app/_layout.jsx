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

  // Hide the Android navigation bar and re-hide it whenever the app comes back to foreground
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        NavigationBar.setVisibilityAsync('hidden');
      }
    });

    return () => subscription.remove();
  }, []);

  // App entry point logic — runs once on mount
  useEffect(() => {
    const checkFirstOpen = async () => {
      const app = await load('app');

      // First time opening the app — show onboarding and mark as opened
      if (!app?.hasOpenedBefore) {
        await save('app', { hasOpenedBefore: true });
        router.replace('/onboarding');
        return;
      }

      // Check if user closed the app mid-flow (e.g. left during OTP)
      // Any screen can save to 'appState' with { stage, params } to resume here
      // To resume a screen: save('appState', { stage: 'routeName', params: { ...} })
      // To clear: save('appState', null)
      const appState = await load('appState');

      if (appState?.stage) {
        router.replace({
          pathname: `/${appState.stage}`,
          params: appState?.params,
        });
        return;
      }

      // Returning user with no saved state — go to landing screen
      setTimeout(() => {
        router.replace('/landingScreen');
      }, 1000);
    };

    checkFirstOpen();
  }, []);

  return (
    <>
      {/* Root navigator — all screens are registered here */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Global toast notifications — must be at root level to show above all screens */}
      <Toast />
    </>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};