// screens/ReferralWallet.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import { Colors } from 'config/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReferralWallet() {
  const referrals = [
    {
      id: 1,
      name: 'Adebayo Debby',
      email: 'adedebby@gmail.com',
      dateJoined: '21/09/2026',
      status: 'Approved',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Adanna Ogbazi',
      email: 'adannaog@gmail.com',
      dateJoined: '21/09/2026',
      status: 'Approved',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 3,
      name: 'Adanna Ogbazi',
      email: 'adannaog@gmail.com',
      dateJoined: '21/09/2026',
      status: 'Approved',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Adanna Ogbazi',
      email: 'adannaog@gmail.com',
      dateJoined: '21/09/2026',
      status: 'Approved',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: 5,
      name: 'Adanna Ogbazi',
      email: 'adannaog@gmail.com',
      dateJoined: '21/09/2026',
      status: 'Approved',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
  ];

  const handleReferFriend = () => {
    console.log('Refer a Friend pressed');
    // Navigate to referral sharing screen
  };

  const handleWithdraw = () => {
    console.log('Withdraw pressed');
    // Navigate to withdrawal screen
  };

  const handleShareWallet = (walletNumber) => {
    console.log('Share wallet:', walletNumber);
    // Implement share functionality
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Referral Wallet"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        {/* Wallet Balance Card */}
        <WalletBalanceCard
          walletName="My Referral Wallet"
          balance="₦5,000.00"
          walletNumber="98E67RY"
          referralCount={3}
          color="#D97706"
          moneyImagePath={require('../../assets/image 82.png')} // ADD YOUR MONEY IMAGE
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={false}
          showDescriptionButton={false}
          showPoints={false}
          showWalletNumber={true}
          showCopyWallet={true}
          showShareButton={true}
          showWithdrawButton={true}
          showTopRightButton={false}
          showTopRightBadge={true}
          showBackgroundImage={false}
          showMoneyImage={true}
          onWithdraw={handleWithdraw}
          onShareWallet={handleShareWallet}
          containerClassName="mx-5 mb-6"
        />

        <View className="px-5">
          {/* Refer a Friend Button */}
          <TouchableOpacity
            onPress={handleReferFriend}
            className="mb-6 flex-row items-center justify-center rounded-lg py-3"
            style={{ backgroundColor: Colors?.primary }}>
            <MaterialIcons name="person-add" size={18} color="white" />
            <Text className="ml-2 text-sm font-semibold text-white">Refer a Friend</Text>
          </TouchableOpacity>

          {/* My Referrals Title */}
          <Text className="mb-4 text-lg font-bold" style={{ color: Colors?.primary }}>
            My Referrals
          </Text>

          {/* Referrals List */}
          {referrals.map((referral) => (
            <View key={referral.id} className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm">
              <View className="flex-row p-4">
                {/* Profile Image */}
                <View className="mr-4 h-24 w-24 overflow-hidden rounded-xl">
                  <Image
                    source={{ uri: referral.image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>

                {/* Referral Details */}
                <View className="flex-1">
                  <Text className="mb-1 text-sm">
                    <Text className="font-semibold" style={{ color: Colors?.primary }}>
                      Name:{' '}
                    </Text>
                    <Text className="text-gray-700">{referral.name}</Text>
                  </Text>

                  <Text className="mb-1 text-sm">
                    <Text className="font-semibold" style={{ color: Colors?.primary }}>
                      Email:{' '}
                    </Text>
                    <Text className="text-gray-700">{referral.email}</Text>
                  </Text>

                  <Text className="mb-1 text-sm">
                    <Text className="font-semibold" style={{ color: Colors?.primary }}>
                      Date Joined:{' '}
                    </Text>
                    <Text className="text-gray-700">{referral.dateJoined}</Text>
                  </Text>

                  <Text className="text-sm">
                    <Text className="font-semibold" style={{ color: Colors?.primary }}>
                      Status:{' '}
                    </Text>
                    <Text className="font-semibold text-green-600">{referral.status}</Text>
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}