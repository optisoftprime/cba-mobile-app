// utils/navigation.js
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function navigateTo(path, params = {}) {
  try {
    if (params && Object.keys(params).length > 0) {
      router.push({ pathname: path, params });
    } else {
      router.push(path);
    }
  } catch (error) {
    Alert.alert('Navigation error', error?.message || 'Unable to navigate to the page');
  }
}

export function navigateBack(fallback = 'landingScreen') {
  try {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallback);
    }
  } catch (error) {
    router.replace(fallback);
  }
}

export function navigateReplace(path) {
  try {
    router.replace(path);
  } catch (error) {
    Alert.alert('Navigation error', error?.message || 'Unable to navigate to the page');
  }
}