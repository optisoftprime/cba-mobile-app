import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import HomePage from 'app/layoutScreens/homeDashBoard';
import BottomNavigation from 'components/bottomNavigationBar';
import Profile from 'app/layoutScreens/profile';
import { useLocalSearchParams } from 'expo-router';
import ScreenNotReady from 'app/layoutScreens/notReady';
import { navigateTo } from 'app/navigate';

export default function HomeLayout() {
  const { screen } = useLocalSearchParams();
  const params = useLocalSearchParams();

  console.log('screen', params);
  const [activeTab, setActiveTab] = useState(screen || 'Home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
    // Add your navigation logic here
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomePage />;
      case 'Profile':
        return <Profile />;
      case 'Card':
        return <ScreenNotReady />;
      case 'Scan':
        navigateTo('setUpFace');
        setActiveTab('Home');
        return null;
      case 'Support':
        return <ScreenNotReady />;
      default:
        return <HomePage />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Content Area - changes based on active tab */}
        {renderContent()}

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    </SafeAreaView>
  );
}
