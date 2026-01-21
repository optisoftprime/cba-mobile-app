// app/index.jsx
import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SplashScreenAppImage } from '../svgs/splashScreen';
import { Colors } from '../config/theme';
import '../global.css';
import { navigateTo } from './navigate';

export default function SplashScreen() {
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance animation
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

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      // Fade out before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        navigateTo("onboarding")
      });
    }, 2600);

    return () => clearTimeout(timer);
  }, [router, fadeAnim, scaleAnim, logoRotate]);

  const rotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1" style={{ backgroundColor: Colors.splashScreenBgColor }}>
      <StatusBar style="light" />
      
      {/* Animated Logo Container - Centered */}
      <View className="flex-1 items-center justify-center">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolate },
            ],
          }}>
          <SplashScreenAppImage />
        </Animated.View>
      </View>
    </View>
  );
}