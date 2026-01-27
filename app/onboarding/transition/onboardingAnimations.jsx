// animations/onboardingAnimations.js
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useOnboardingAnimation = (currentIndex) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);
  const prevIndex = useRef(currentIndex);

  useEffect(() => {
    if (prevIndex.current === currentIndex || isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    const direction = currentIndex > prevIndex.current ? -1 : 1;
    
    // Fade out and slide
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: direction * 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(direction * -50);
      
      // Fade in and slide back
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
        prevIndex.current = currentIndex;
      });
    });
  }, [currentIndex, slideAnim, fadeAnim]);

  return {
    slideAnim,
    fadeAnim,
  };
};