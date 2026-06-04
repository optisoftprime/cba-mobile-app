// app/index.jsx
import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SplashScreenAppImage } from '../svgs/splashScreen';
import '../global.css';
import { save, load } from '../config/storage';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(async () => {
      // ✅ All navigation logic lives here now
      let destination = '/landingScreen';
      let params = undefined;

      try {
        const app = await load('app');

        if (!app?.hasOpenedBefore) {
          await save('app', { hasOpenedBefore: true });
          destination = '/onboarding';
        } else {
          const appState = await load('appState');
          if (appState?.stage) {
            destination = `/${appState.stage}`;
            params = appState?.params;
          }
        }
      } catch (e) {
        console.warn('Storage read failed, defaulting to landingScreen', e);
      }

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (params) {
          router.replace({ pathname: destination, params });
        } else {
          router.replace(destination);
        }
      });
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1" style={{ backgroundColor: '#D4E8F5' }}>
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
          }}>
          <SplashScreenAppImage />
        </Animated.View>
      </View>
    </View>
  );
}