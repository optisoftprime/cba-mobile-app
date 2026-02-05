import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WalletBalanceCard from 'components/walletCard';
import { navigateTo } from 'app/navigate';

export default function HomePage() {
  const services = [
    {
      name: 'Transfer',
      icon: 'swap-horizontal',
      color: '#FCE7F3',
      iconColor: '#BE185D',
      link: 'transferType',
    },
    { name: 'Savings', icon: 'wallet', color: '#FEF3C7', iconColor: '#D97706', link: 'save' },
    {
      name: 'RizeCopp',
      icon: 'chatbubbles',
      color: '#CFFAFE',
      iconColor: '#0891B2',
      link: 'rizeCoopOptions',
    },
    { name: 'Loan', icon: 'home', color: '#D9F99D', iconColor: '#65A30D', link: 'loanData' },
    {
      name: 'Self Service',
      icon: 'card',
      color: '#E9D5FF',
      iconColor: '#7C3AED',
      link: 'profileSettings',
    },
    {
      name: 'Utilities',
      icon: 'stats-chart',
      color: '#DBEAFE',
      iconColor: '#2563EB',
      link: 'utilitiesOptions',
    },
  ];

  const goodies = [
    {
      title: 'Refer & Earn',
      points: '3,450 points',
      color: '#A16207',
      bgColor: '#CA8A04',
    },
    {
      title: 'Cashback',
      amount: '₦0.00',
      subtitle: 'This Month Cashback',
      color: '#B91C1C',
      bgColor: '#DC2626',
    },
  ];

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-white px-5 pb-4 pt-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/Ellipse 2.png')}
              className="mr-3 h-10 w-10 rounded-full"
            />
            <Text className="text-base font-semibold text-gray-800">Hello John</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigateTo('notification');
            }}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Balance Card */}
      <WalletBalanceCard
        balance="₦ 45,465.87"
        points="3,145 Points"
        walletNumber="0987654321"
        showWalletName={true}
        showBalance={true}
        showBalanceToggle={true}
        showDescription={false} // No description needed here
        showPoints={true}
        showWalletNumber={true}
        showCopyWallet={true}
        showTopRightButton={false}
        containerClassName="px-5 py-4"
      />

      {/* Over View Section */}
      <View className="mb-4 px-5">
        <Text className="mb-3 text-base font-semibold text-gray-800">Over View</Text>
        <View className="flex-row flex-wrap justify-between">
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              className="mb-4 w-[30%] items-center justify-center rounded-xl p-4 shadow-xl"
              style={{ backgroundColor: service.color }}
              onPress={() => {
                navigateTo(service?.link);
              }}
              activeOpacity={0.7}>
              <Ionicons name={service.icon} size={28} color={service.iconColor} />
              <Text className="mt-2 text-xs font-medium text-gray-700">{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Goodies Section */}
      <View className="mb-4 px-5">
        <Text className="mb-3 text-base font-semibold text-gray-800">Goodies</Text>
        <View className="flex-row justify-between">
          {goodies.map((goodie, index) => (
            <View
              key={index}
              className="mr-2 flex-1 rounded-xl p-4"
              style={{ backgroundColor: goodie.bgColor }}>
              <Ionicons name={index === 0 ? 'gift' : 'cash'} size={24} color="white" />
              <Text className="mb-1 mt-2 text-xs text-white">{goodie.title}</Text>
              <Text className="text-lg font-bold text-white">{goodie.points || goodie.amount}</Text>
              {goodie.subtitle && (
                <Text className="mt-1 text-xs text-white/90">{goodie.subtitle}</Text>
              )}
              {index === 0 && (
                <TouchableOpacity className="mt-2 self-start rounded-full bg-white px-3 py-1">
                  <Text className="text-xs font-medium" style={{ color: goodie.color }}>
                    Join Us
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Transaction History */}
      <View className="px-5 pb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-800">Transaction History</Text>
          <TouchableOpacity>
            <Text className="text-sm font-medium text-[#0E7490]">View All</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-3 text-xs text-gray-500">Today</Text>

        <View className="rounded-xl bg-white p-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
              className="h-12 w-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-semibold text-gray-800">Daniel Gabriel</Text>
              <Text className="mt-1 text-xs text-gray-500">Transfer • 16:32</Text>
            </View>
            <View className="items-end">
              <Text className="text-sm font-bold text-gray-800">₦35,000.00</Text>
              <Text className="mt-1 text-xs text-green-600">Successful</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
