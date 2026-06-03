// utils/navigation.js
import { router, useSegments, usePathname } from 'expo-router';
import Toast from 'react-native-toast-message';

export function navigateTo(path, params = {}) {
  try {
    console.log('navigating to ', path);
    if (params && Object.keys(params).length > 0) {
      router.push({ pathname: path, params });
    } else {
      router.push(path);
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Navigation Error', text2: error?.message });
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
    Toast.show({ type: 'error', text1: 'Navigation Error', text2: error?.message });
    router.replace(fallback);
  }
}

export function navigateReplace(path, params = {}) {
  try {
    console.log('navigating to ', path);
    if (params && Object.keys(params).length > 0) {
      router.replace({ pathname: path, params });
    } else {
      router.replace(path);
    }
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Navigation Error', text2: error?.message });
  }
}

/**
 * Returns the current full pathname as a string.
 * e.g. "/home/dashboard", "/auth/login"
 *
 * Usage (must be called inside a React component):
 *
 *   import { useCurrentRoute } from 'utils/navigation';
 *
 *   function MyScreen() {
 *     const currentRoute = useCurrentRoute();
 *     console.log(currentRoute); // e.g. "/home/dashboard"
 *   }
 */
export function useCurrentRoute() {
  const pathname = usePathname();
  return pathname;
}

/**
 * Returns the current route segments as an array.
 * e.g. ["home", "dashboard"] for "/home/dashboard"
 *
 * Useful for checking which section of the app you're in:
 *
 *   const segments = useCurrentSegments();
 *   const isInAuth = segments[0] === 'auth';
 */
export function useCurrentSegments() {
  const segments = useSegments();
  return segments;
}