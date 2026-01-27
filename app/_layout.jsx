// app/_layout.jsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function Layout() {
  useEffect(() => {
    // Hide on mount
    NavigationBar.setVisibilityAsync('hidden');

    // Re-hide when app comes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        NavigationBar.setVisibilityAsync('hidden');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};
