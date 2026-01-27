// screens/Leaderboard.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'Emma Wilson',
      memberType: 'Diamond member',
      points: 6470,
      isCurrentUser: false,
      badge: '👑',
    },
    {
      id: 2,
      rank: 2,
      name: 'Marcus Chen',
      memberType: 'Platinum Member',
      points: 6470,
      isCurrentUser: false,
      badge: '👑',
    },
    {
      id: 3,
      rank: 3,
      name: 'You',
      memberType: 'Platinum member',
      points: 6470,
      isCurrentUser: true,
      badge: '👑',
    },
    {
      id: 4,
      rank: 4,
      name: 'Sofia Garcia',
      memberType: 'Gold member',
      points: 6470,
      isCurrentUser: false,
      badge: '👑',
    },
    {
      id: 5,
      rank: 5,
      name: 'Alex Kumar',
      memberType: 'Gold member',
      points: 6470,
      isCurrentUser: false,
      badge: '👑',
    },
    {
      id: 6,
      rank: 6,
      name: 'John Dave',
      memberType: 'Platinum member',
      points: 6470,
      isCurrentUser: false,
      badge: '👑',
    },
  ];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-400';
      case 2:
        return 'bg-yellow-400';
      case 3:
        return 'bg-orange-400';
      case 4:
        return 'bg-yellow-400';
      case 5:
        return 'bg-yellow-400';
      default:
        return 'bg-yellow-400';
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Leaderboard" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View className="mb-4 flex-row items-center justify-end">
          <TouchableOpacity className="flex-row items-center rounded-lg border border-gray-300 bg-white px-3 py-2">
            <Text className="mr-2 text-sm text-gray-700">{selectedPeriod}</Text>
            <Ionicons name="chevron-down" size={16} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Leaderboard List */}
        {leaderboardData.map((user) => (
          <View
            key={user.id}
            className={`mb-3 flex-row items-center rounded-xl px-4 py-3 ${
              user.isCurrentUser ? 'bg-blue-50' : 'bg-white'
            }`}>
            {/* Rank Badge */}
            <View
              className={`mr-3 h-10 w-10 items-center justify-center rounded-full ${getRankColor(user.rank)}`}>
              <Text className="text-base font-bold text-white">{user.rank}</Text>
            </View>

            {/* Crown Badge */}
            {user.badge && <Text className="mr-2 text-xl">{user.badge}</Text>}

            {/* User Info */}
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-900">{user.name}</Text>
              <Text className="text-xs text-gray-500">{user.memberType}</Text>
            </View>

            {/* Points */}
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="#F59E0B" />
              <Text className="ml-1 text-base font-bold text-gray-900">{user.points}</Text>
              <Ionicons name="arrow-up" size={14} color="#10B981" className="ml-1" />
            </View>
          </View>
        ))}

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}