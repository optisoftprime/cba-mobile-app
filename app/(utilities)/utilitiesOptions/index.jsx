// screens/Utilities.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function Utilities() {
  const utilityOptions = [
    {
      id: 'airtime',
      title: 'Airtime',
      iconName: 'phone-portrait-outline',
      bgColor: '#6B4423',
      cardBg: '#FFF8F0',
      onPress: () => navigateTo('buyAirtime'),
    },
    {
      id: 'data',
      title: 'Data',
      iconName: 'globe-outline',
      bgColor: '#0E5C7D',
      cardBg: '#EFF8FB',
      onPress: () => navigateTo('buyData'),
    },
    {
      id: 'paybills',
      title: 'Pay Bills',
      iconName: 'card-outline',
      bgColor: '#B85C28',
      cardBg: '#FFF8F0',
      onPress: () => navigateTo('billType'),
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Utilities"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 10, paddingTop: 24 }}
        showsVerticalScrollIndicator={false}>
        {/* Grid Layout */}
        <View className="flex-row flex-wrap">
          {utilityOptions.map((option, index) => (
            <View
              key={option.id}
              className="w-1/2 p-2"
              style={{
                paddingRight: index % 2 === 0 ? 8 : 16,
                paddingLeft: index % 2 === 0 ? 16 : 8,
              }}>
              <TouchableOpacity
                onPress={option.onPress}
                className="items-center rounded-2xl p-3"
                style={{ 
                  backgroundColor: option.cardBg,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
                activeOpacity={0.7}>
                {/* Icon Circle */}
                <View
                  className="mb-4 h-16 w-16 items-center justify-center rounded-full"
                  style={{ 
                    backgroundColor: option.bgColor,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 6,
                  }}>
                  <Ionicons name={option.iconName} size={32} color="white" />
                </View>

                {/* Title */}
                <Text className="text-center text-base font-semibold text-gray-900">
                  {option.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}