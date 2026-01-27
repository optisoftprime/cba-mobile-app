// screens/Registration.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { registrationSteps, registrationConfig } from 'config/registrationStepsData';
import { navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';

export default function Registration() {
  const handleGetStarted = () => {
    // Navigate to first registration step
    console.log('Navigate to registration flow');
    navigateTo('registration');
  };

  return (
    <ImageBackground
      source={require('../../../assets/image 2.png')}
      className="flex-1"
      resizeMode="cover">
      <GlobalStatusBar style="light-content" />
      <View className="flex-1" style={{ backgroundColor: Colors.primary, opacity: 0.75 }}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 60,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-8">
            <Text className="mb-2 text-3xl font-bold text-white">{registrationConfig.title}</Text>
            <Text className="text-base text-white opacity-90">{registrationConfig.subtitle}</Text>
          </View>

          {/* Steps List */}
          <View className="mb-6 flex-1">
            {registrationSteps.map((item, index) => (
              <View
                key={item.step}
                className={`mb-6 flex-row ${index === registrationSteps.length - 1 ? '' : 'pb-6'}`}>
                {/* Step Number Circle */}
                <View className="mr-4">
                  <View
                    className="h-10 w-10 items-center justify-center rounded-full bg-white"
                    style={{ backgroundColor: 'white' }}>
                    <Text className="text-lg font-bold" style={{ color: Colors?.primary }}>
                      {item.step}
                    </Text>
                  </View>
                </View>

                {/* Step Content */}
                <View className="flex-1">
                  <Text className="mb-2 text-lg font-bold text-white">{item.title}</Text>
                  <Text className="text-sm leading-5 text-white opacity-90">
                    {item.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Get Started Button */}
          <View className="mt-auto pt-4">
            <TouchBtn
              onPress={handleGetStarted}
              label={registrationConfig.buttonText}
              backgroundColor="white"
              textColor={Colors?.primary}
              textClassName="text-lg font-semibold"
              buttonClassName="items-center rounded-lg py-4" // This matches your original exactly
              activeOpacity={0.8}
              containerClassName="" // Empty string to remove default px-6 pb-8
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
