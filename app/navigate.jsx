// utils/navigation.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export function navigateTo(path, params = {}) {
  try {
    console.log("navigating to ", path)
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

export function navigateReplace(path, params = {}) {
  try {
    console.log("navigating to ", path)
    if (params && Object.keys(params).length > 0) {
      router.replace({ pathname: path, params });
    } else {
      router.replace(path);
    }
  } catch (error) {
    Alert.alert('Navigation error', error?.message || 'Unable to navigate to the page');
  }
}


// async function logAllStorage() {
//   const keys = await AsyncStorage.getAllKeys();
//   const items = await AsyncStorage.multiGet(keys);
//   console.log('=== ASYNC STORAGE ===');
//   items.forEach(([key, value]) => {
//     console.log(`${key}:`, JSON.parse(value));
//   });
//   console.log('=====================');
// }

// logAllStorage();