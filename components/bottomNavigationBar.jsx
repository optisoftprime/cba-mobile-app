// FILE 1: components/BottomNavigation.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function BottomNavigation({ activeTab = 'Home', onTabChange }) {
  const tabs = [
    { name: 'Home', icon: 'home', iconOutline: 'home-outline' },
    { name: 'Card', icon: 'card', iconOutline: 'card-outline' },
    { name: 'Scan', icon: 'scan-circle', iconOutline: 'scan-circle-outline' },
    { name: 'Support', icon: 'headset', iconOutline: 'headset-outline' },
    { name: 'Profile', icon: 'person', iconOutline: 'person-outline' },
  ];

  return (
    <View className="flex-row border-t border-gray-200 bg-white px-4 pb-6 shadow-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        const isScan = tab.name === 'Scan';

        if (isScan) {
          return (
            <TouchableOpacity
              key={tab.name}
              className="mb-5 flex-1 items-center justify-center"
              onPress={() => onTabChange?.(tab.name)}
              activeOpacity={0.7}>
              <View 
                className="border-3 -mt-9 rounded-full p-3"
                style={{ backgroundColor: Colors?.primary || '#0E7490' }}
              >
                <Ionicons name="scan" size={28} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            className="flex-1 items-center justify-center py-2"
            onPress={() => onTabChange?.(tab.name)}
            activeOpacity={0.7}>
            <Ionicons
              name={isActive ? tab.icon : tab.iconOutline}
              size={24}
              color={isActive ? (Colors?.primary || '#0E7490') : '#9CA3AF'}
            />
            <Text
              className={`mt-1 text-xs ${
                isActive ? 'font-medium' : 'text-gray-400'
              }`}
              style={isActive ? { color: Colors?.primary } : {}}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}