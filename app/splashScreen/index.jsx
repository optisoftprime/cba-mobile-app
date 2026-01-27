import React from 'react';
import { View } from 'react-native';
import {
  SplashScreenAppImage,
  SplashScreenBottomCurve,
  SplashScreenTopCurve,
} from '../../svgs/splashScreen';

export default function SplashScreen() {
  return (
    <View className={`flex-1 bg-[#D4E8F5]`}>
      {/* Top SVG Wave */}
      <View className="flex items-end" style={{ transform: [{ rotate: '180deg' }] }}>
        <SplashScreenBottomCurve />
      </View>

      {/* Center Logo */}
      <View className="m-auto">
        <SplashScreenAppImage />
      </View>

      {/* Bottom SVG Wave */}
      <View className="flex items-end">
        <SplashScreenBottomCurve />
      </View>
    </View>
  );
}

