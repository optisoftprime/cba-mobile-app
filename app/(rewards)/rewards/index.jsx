// screens/Rewards.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack, navigateTo } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function Rewards() {
  return (
    <View className="flex-1 bg-white">
      <Header title="Rewards" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        {/* Level Card */}

        <LinearGradient
          colors={['#9700EB', '#D91AAB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="mb-4 overflow-hidden rounded-2xl p-4">
          {/* Header */}
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="trophy" size={20} color="white" />
              <Text className="ml-2 text-base font-semibold text-white">
                Level 7 Discipline Builder
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-white/20 px-3 py-1">
              <Ionicons name="diamond" size={14} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">3570</Text>
            </View>
          </View>

          {/* Goal Info */}
          <Text className="mb-2 text-xs text-white/80">Goals: 1/3</Text>
          <Text className="mb-2 text-xs text-white/80">Progress from 0</Text>

          {/* Progress Bar */}
          <View className="mb-3 h-2 overflow-hidden rounded-full bg-white/30">
            <View className="h-full rounded-full bg-yellow-400" style={{ width: '45%' }} />
          </View>

          {/* Stats */}
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-xs text-white/80">Points</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-xs text-white/80">Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-white">12</Text>
              <Text className="text-xs text-white/80">Days</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Daily Challenges */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-gray-900">Daily Challenges</Text>
          <TouchableOpacity className="rounded-full bg-blue-100 px-4 py-1" onPress={(()=>{
            navigateTo("leaderboard")
          })}>
            <Text className="text-sm font-medium text-blue-600">Leaderboard</Text>
          </TouchableOpacity>
        </View>

        {/* Save Consistently Challenge */}
        <View className="mb-3 overflow-hidden rounded-2xl bg-blue-600 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="wallet" size={20} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">Save Consistently</Text>
          </View>
          <Text className="mb-3 text-xs text-white/80">
            Complete three savings streaks to earn points
          </Text>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-white/30">
            <View className="h-full rounded-full bg-white" style={{ width: '60%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">+50 Points</Text>
            </View>
            <Text className="text-xs text-white/80">60%</Text>
          </View>
        </View>

        {/* Check Budget Challenge */}
        <TouchableOpacity className="mb-4 overflow-hidden rounded-2xl bg-green-600 p-4" onPress={()=>{
            navigateTo("budget")
        }}>
          <View className="mb-2 flex-row items-center">
            <Ionicons name="calculator" size={20} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">Check your budget</Text>
          </View>
          <Text className="mb-3 text-xs text-white/80">Log your expenses regularly</Text>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-white/30">
            <View className="h-full rounded-full bg-white" style={{ width: '100%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">+100 Points</Text>
            </View>
            <Text className="text-xs text-white/80">100%</Text>
          </View>
        </TouchableOpacity>

        {/* Weekly Challenge */}
        <Text className="mb-3 text-lg font-bold text-gray-900">Weekly Challenge</Text>

        {/* Weekly Savings Goal */}
        <View
          className="mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4"
          style={{ elevation: 1.5, backgroundColor: 'white' }}>
          <View className="mb-2 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Ionicons name="trending-up" size={20} color="#2563EB" />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-900">
                Weekly Savings Goal
              </Text>
              <Text className="text-xs text-gray-500">Save a specific amount by</Text>
            </View>
          </View>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <View className="h-full rounded-full bg-blue-600" style={{ width: '88%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text className="ml-1 text-xs text-gray-600">5 days left</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="#EF4444" />
              <Text className="ml-1 text-xs font-semibold text-red-500">500</Text>
            </View>
            <Text className="text-xs font-semibold text-gray-900">88%</Text>
          </View>
        </View>

        {/* Level Up Money Skills */}
        <View
          className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4"
          style={{ elevation: 1.5, backgroundColor: 'white' }}>
          <View className="mb-2 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-pink-100">
              <Ionicons name="school" size={20} color="#EC4899" />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-base font-semibold text-gray-900">
                Level Up Your Money Skills
              </Text>
              <Text className="text-xs text-gray-500">Learn about investments</Text>
            </View>
          </View>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
            <View className="h-full rounded-full bg-pink-500" style={{ width: '88%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text className="ml-1 text-xs text-gray-600">5 days left</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="#EF4444" />
              <Text className="ml-1 text-xs font-semibold text-red-500">500</Text>
            </View>
            <Text className="text-xs font-semibold text-gray-900">88%</Text>
          </View>
        </View>

        {/* Achievements */}
        <Text className="mb-3 text-lg font-bold text-gray-900">Achievements</Text>
        <View className="mb-4 flex-row flex-wrap">
          {[
            'First save',
            '7-day streak',
            'Budget Master',
            'Goal Getter',
            'Investor',
            'Legendary Saver',
          ].map((achievement, index) => (
            <View
              key={index}
              className={`mb-3 mr-3 h-24 w-[30%] items-center justify-center rounded-xl ${
                index === 2 ? 'bg-teal-700' : 'bg-gray-400'
              }`}>
              <Ionicons
                name={index === 2 ? 'checkmark-circle' : 'lock-closed'}
                size={32}
                color="white"
              />
              <Text className="mt-2 text-center text-xs font-medium text-white">{achievement}</Text>
            </View>
          ))}
        </View>

        {/* Smart Nudges */}
        <Text className="mb-3 text-lg font-bold text-gray-900">Smart Nudges</Text>

        {/* Nudge 1 */}
        <View className="mb-3 overflow-hidden rounded-2xl border border-red-300 bg-red-50 p-4">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
            </View>
            <Text className="flex-1 text-sm text-gray-700">
              You are ₦50,000 away from your monthly savings goal. You got this!
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg py-3" style={{ backgroundColor: Colors.primary }}>
            <Text className="text-center text-sm font-semibold text-white">Transfer</Text>
          </TouchableOpacity>
        </View>

        {/* Nudge 2 */}
        <View className="mb-4 overflow-hidden rounded-2xl border border-red-300 bg-red-50 p-4">
          <View className="mb-3 flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
            </View>
            <Text className="flex-1 text-sm text-gray-700">
              You practically save more on Fridays. Consider auto saving ₦20,000 today!
            </Text>
          </View>
          <TouchableOpacity className="rounded-lg py-3" style={{ backgroundColor: Colors.primary }}>
            <Text className="text-center text-sm font-semibold text-white">Set Up</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Challenges */}
        <Text className="mb-3 text-lg font-bold text-gray-900">Personal Challenges</Text>

        {/* Smart Spending Streak */}
        <View className="mb-3 overflow-hidden rounded-2xl bg-blue-600 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="wallet" size={20} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">Smart Spending Streak</Text>
          </View>
          <Text className="mb-3 text-xs text-white/80">
            You saved instead of overspending! Keep the momentum going
          </Text>
          <Text className="mb-2 text-xs text-white/80">Progress</Text>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-white/30">
            <View className="h-full rounded-full bg-white" style={{ width: '56%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">+250 Points rewarded</Text>
            </View>
            <Text className="text-xs text-white/80">3 days</Text>
          </View>
        </View>

        {/* Investments Milestone */}
        <View className="mb-4 overflow-hidden rounded-2xl bg-green-600 p-4">
          <View className="mb-2 flex-row items-center">
            <Ionicons name="trending-up" size={20} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">Investments Mile Stone</Text>
          </View>
          <Text className="mb-3 text-xs text-white/80">
            Based on your goals, invest ₦500,000 by end of quarter
          </Text>
          <Text className="mb-2 text-xs text-white/80">Progress</Text>
          <View className="mb-2 h-2 overflow-hidden rounded-full bg-white/30">
            <View className="h-full rounded-full bg-white" style={{ width: '56%' }} />
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="white" />
              <Text className="ml-1 text-sm font-semibold text-white">+250 Points rewarded</Text>
            </View>
            <Text className="text-xs text-white/80">3 days</Text>
          </View>
        </View>

        {/* Daily Mini Games */}
        <Text className="mb-3 text-lg font-bold text-gray-900">Daily Mini Games</Text>

        {/* Budget Blitz */}
        <View className="mb-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
          <View className="mb-3 items-center">
            <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name="game-controller" size={32} color="#374151" />
            </View>
            <Text className="mb-1 text-base font-semibold text-gray-900">Budget Blitz</Text>
            <Text className="text-xs text-gray-500">Test your budgeting skills</Text>
          </View>
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-xs text-gray-600">3 plays left</Text>
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="#EF4444" />
              <Text className="ml-1 text-xs font-semibold text-red-500">50-300 points</Text>
            </View>
          </View>
          <TouchableOpacity className="rounded-lg py-3" style={{ backgroundColor: Colors.primary }}>
            <Text className="text-center text-sm font-semibold text-white">Play Now</Text>
          </TouchableOpacity>
        </View>

        {/* Savings Spinner */}
        <TouchableOpacity onPress={(()=>{navigateTo("spin")})} className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
          <View className="mb-3 items-center">
            <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Ionicons name="disc" size={32} color="#374151" />
            </View>
            <Text className="mb-1 text-base font-semibold text-gray-900">Savings Spinner</Text>
            <Text className="text-xs text-gray-500">Daily spin to win points</Text>
          </View>
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-xs text-gray-600">3 plays left</Text>
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={14} color="#EF4444" />
              <Text className="ml-1 text-xs font-semibold text-red-500">25-500 points</Text>
            </View>
          </View>
          <TouchableOpacity className="rounded-lg py-3" style={{ backgroundColor: Colors.primary }}>
            <Text className="text-center text-sm font-semibold text-white">Play Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Bottom Spacing */}
        <View className="h-6" />
      </ScrollView>
    </View>
  );
}
