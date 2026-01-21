// ============================================================

// FILE 3: screens/HomeLayout.jsx
import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import HomePage from 'app/layoutScreens/homeDashBoard';
import BottomNavigation from 'components/bottomNavigationBar';

export default function HomeLayout() {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
    // Add your navigation logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Content Area - changes based on active tab */}
        {activeTab === 'Home' && <HomePage />}
        {/* Add other tab screens here */}

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}
