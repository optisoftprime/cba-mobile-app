import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingAppLogo } from 'svgs/onboarding';
import { LinearGradient } from 'expo-linear-gradient';
import { pageData } from 'config/onboarding';
import { useOnboardingAnimation } from './transition/onboardingAnimations';
import { navigateBack, navigateTo } from 'app/navigate';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';

export default function OnboardingWelcome() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { slideAnim, fadeAnim } = useOnboardingAnimation(currentIndex);

  const handleNext = () => {
    if (currentIndex < pageData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigateTo('/landingScreen');
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      navigateBack();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentData = pageData[currentIndex];

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar />

      {/* Back Button */}
      <TouchableOpacity
        className="absolute left-4 top-12 z-10"
        onPress={handleBack}
        disabled={currentIndex === 0}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={currentIndex === 0 ? 'gray' : 'black'}
        />
      </TouchableOpacity>

      {/* Floating App Logo */}
      <View className="absolute left-4 top-20 z-10">
        <OnboardingAppLogo />
      </View>

      {/* Animated Content */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        }}>
        <ImageBackground
          source={currentData.image}
          className="flex-1"
          resizeMode="cover">
          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', Colors?.accent, Colors?.secondary]}
            locations={[0.4, 0.7, 1]}
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '50%' }}
          />
        </ImageBackground>

        {/* Content Section with Teal Background */}
        <View className="px-6 pb-8 pt-6" style={{ backgroundColor: Colors?.secondary }}>
          <Text className="mb-3 text-3xl font-bold text-white">{currentData.title}</Text>

          <Text className="mb-6 text-base text-white">{currentData.text}</Text>

          {/* Pagination Dots and Next Button Row */}
          <View className="flex-row items-center justify-end px-4">
            {/* Pagination Dots (Centered) */}
            <View
              className={`absolute left-0 right-0 flex-row justify-center ${
                currentIndex === pageData.length - 1 ? 'mr-20' : 'mr-15'
              }`}>
              {pageData.map((_, index) => (
                <Animated.View
                  key={index}
                  style={{
                    width: index === currentIndex ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'white',
                    opacity: index === currentIndex ? 1 : 0.5,
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            {/* Next Button (Right) */}
            <TouchableOpacity
              className="rounded-lg bg-white px-6 py-3"
              onPress={handleNext}>
              <Text className="text-base font-semibold" style={{ color: Colors?.primary }}>
                {currentIndex === pageData.length - 1 ? 'Get Started' : 'Next >'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}