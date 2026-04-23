// utils/navigation.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export function navigateTo(path, params = {}) {
  try {
    console.log("navigating to ", path)
    if (params && Object.keys(params).length > 0) {
      router.push({ pathname: path, params });
    } else {
      router.push(path);
    }
  } catch (error) {
    Toast.show({ type: "error", text1: "Navigation Error", text2: error?.message })
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
    Toast.show({ type: "error", text1: "Navigation Error", text2: error?.message })

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
    Toast.show({ type: "error", text1: "Navigation Error", text2: error?.message })
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