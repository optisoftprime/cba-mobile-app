// app/_sitemap.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: '404 - Page Not Found',
          headerShown: false 
        }} 
      />
      
      <View className="flex-1 bg-[#D6EAF8]">
        {/* Top Curve Decoration */}
        <View className="absolute left-0 top-0">
          <View 
            style={{ 
              width: 120, 
              height: 80, 
              backgroundColor: '#157196',
              borderBottomRightRadius: 100,
              opacity: 0.3
            }} 
          />
        </View>

        {/* Bottom Curve Decoration */}
        <View className="absolute bottom-0 right-0">
          <View 
            style={{ 
              width: 150, 
              height: 120, 
              backgroundColor: '#157196',
              borderTopLeftRadius: 150,
              opacity: 0.3
            }} 
          />
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-6">
          {/* App Logo */}
          <View className="mb-8 items-center">
            <Image
              source={require('../assets/onboardingImage.png')}
              className="h-32 w-32"
              resizeMode="contain"
            />
          </View>

          {/* 404 Text */}
          <Text className="mb-3 text-6xl font-bold text-[#157196]">
            404
          </Text>

          {/* Error Message */}
          <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
            Page Not Found
          </Text>
          
          <Text className="mb-8 text-center text-base text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </Text>

          {/* Go Back Button */}
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('login'); // Go to home if can't go back
              }
            }}
            className="w-full items-center rounded-lg py-4 bg-[#157196]">
            <Text className="text-base font-bold text-white">Go Back</Text>
          </TouchableOpacity>
          
          {/* Go Home Button */}
          <TouchableOpacity
            onPress={() => router.replace('/')}
            className="mt-4 w-full items-center rounded-lg py-4 border border-[#157196]">
            <Text className="text-base font-bold text-[#157196]">
              Go to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}