// animations/onboardingAnimations.js
import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useOnboardingAnimation = (currentIndex, onNext, onBack) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const isAnimating = useRef(false);

  const animateTransition = useCallback((nextIndex) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const direction = nextIndex > currentIndex ? -1 : 1;
    
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
      // Call the callback to update index
      if (nextIndex > currentIndex) {
        onNext(nextIndex);
      } else {
        onBack(nextIndex);
      }
      
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
      });
    });
  }, [currentIndex, slideAnim, fadeAnim, onNext, onBack]);

  return {
    slideAnim,
    fadeAnim,
    animateTransition,
  };
};