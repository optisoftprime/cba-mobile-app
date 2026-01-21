// utils/navigation.js (or helpers/navigation.js)
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

export function navigateBack() {
  try {
    router.back();
  } catch (error) {
    Alert.alert('Navigation error', error?.message || 'Unable to navigate back');
  }
}

export function navigateReplace(path) {
  try {
    router.replace(path);
  } catch (error) {
    Alert.alert('Navigation error', error?.message || 'Unable to navigate to the page');
  }
}