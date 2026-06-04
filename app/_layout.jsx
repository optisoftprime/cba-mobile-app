// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

// ✅ Remove this: import * as NavigationBar from 'expo-navigation-bar';

const queryClient = new QueryClient();

export default function Layout() {
  // ✅ Remove the entire NavigationBar useEffect — app.json handles it

  return (
    <QueryClientProvider client={queryClient}>
      <ExpoStatusBar style="auto" hidden={false} />
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </QueryClientProvider>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};