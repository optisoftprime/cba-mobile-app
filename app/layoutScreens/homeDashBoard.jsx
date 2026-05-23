// screens/HomePage.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { navigateReplace, navigateTo } from 'app/navigate';
import Toast from 'react-native-toast-message';
import { trimMessage, formatAmount, formatTier, getUpgradeLabel } from 'helper';
import { getDashBoardData } from 'api/home';
import { fetchUserDetails } from 'api/userProfile';
import { updateUser } from 'config/storage';
import HomeWalletCard from 'components/homeWalletCard';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function groupTransactionsByDate(transactions) {
  const groups = {};
  for (const tx of transactions) {
    const date = new Date(tx?.transactionDate);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let label;
    if (date.toDateString() === today.toDateString()) {
      label = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = 'Yesterday';
    } else {
      label = date.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(tx);
  }
  return groups;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ width, height, radius = 6, style }) {
  return (
    <View
      style={[{ width, height, borderRadius: radius, backgroundColor: '#E5E7EB' }, style]}
    />
  );
}

function TransactionSkeleton() {
  return (
    <View style={{ borderRadius: 12, backgroundColor: 'white', overflow: 'hidden' }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: i < 3 ? 1 : 0,
            borderBottomColor: '#F3F4F6',
          }}>
          <Skeleton width={48} height={48} radius={24} />
          <View style={{ marginLeft: 12, flex: 1, gap: 6 }}>
            <Skeleton width="60%" height={13} />
            <Skeleton width="40%" height={11} style={{ marginTop: 4 }} />
          </View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <Skeleton width={72} height={13} />
            <Skeleton width={52} height={11} style={{ marginTop: 4 }} />
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── Transaction Item ─────────────────────────────────────────────────────────

function TransactionItem({ tx }) {
  const isSuccessful =
    tx?.status?.toLowerCase() === 'successful' || tx?.status?.toLowerCase() === 'success';

  const initials = tx?.customerName
    ? tx.customerName
        .split(' ')
        .slice(0, 2)
        .map((n) => n.charAt(0).toUpperCase())
        .join('')
    : '?';

  return (
    <TouchableOpacity
      onPress={() => console.log('Transaction:', tx)}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
      }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#E0F2FE',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#0369A1' }}>{initials}</Text>
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2937' }} numberOfLines={1}>
          {tx?.customerName || tx?.description || 'Transaction'}
        </Text>
        <Text style={{ marginTop: 2, fontSize: 12, color: '#6B7280' }}>
          {tx?.transactionType} • {formatTime(tx?.transactionDate)}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#1F2937' }}>
          {formatAmount(tx?.amount)}
        </Text>
        <Text style={{ marginTop: 2, fontSize: 12, color: isSuccessful ? '#059669' : '#D97706' }}>
          {tx?.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyTransactions() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
      <View
        style={{
          marginBottom: 12,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: '#F3F4F6',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="receipt-outline" size={28} color="#9CA3AF" />
      </View>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#4B5563' }}>No transactions yet</Text>
      <Text style={{ marginTop: 4, fontSize: 12, color: '#9CA3AF' }}>
        Your transaction history will appear here
      </Text>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const queryClient = useQueryClient();

  // ── Silently refresh user profile every time the screen focuses ──────────────
  useFocusEffect(
    React.useCallback(() => {
      async function syncUserProfile() {
        try {
          const result = await fetchUserDetails();
          if (!result?.ok) return;
          const profile = result?.data?.data;
          await updateUser({
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            middleName: profile?.middleName,
            mobilePhone: profile?.mobilePhone,
            gender: profile?.gender,
            dateOfBirth: profile?.dateOfBirth,
            address: profile?.addressDto,
            customerKycTier: profile?.customerKycTier,
          });
          // update the query cache silently so UI reflects latest profile
          queryClient.setQueryData(['userDetails'], profile);
        } catch (_) {
          // silent — never block or show errors for background sync
        }
      }
      syncUserProfile();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => null },
            { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  // ── User profile cache — UI reads from here, syncUserProfile keeps it fresh ──
  const { data: userDetails } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const result = await fetchUserDetails();
      if (!result?.ok) throw new Error(result?.message);
      const profile = result?.data?.data;
      await updateUser({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        middleName: profile?.middleName,
        mobilePhone: profile?.mobilePhone,
        gender: profile?.gender,
        dateOfBirth: profile?.dateOfBirth,
        address: profile?.addressDto,
        customerKycTier: profile?.customerKycTier,
      });
      return profile;
    },
    staleTime: 1000 * 60 * 10,
  });

  // ── Dashboard — provides balance, account number, transactions ───────────────
  const {
    data: dashData,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await getDashBoardData();
      console.log('dashboard response');
      console.log(JSON.stringify(response, null, 2));
      const data = response?.data?.data;

      const accountNumber = data?.accountNumber;
      const accountName = data?.accountName;
      const walletBalance = data?.walletBalance;

      if (!accountNumber || !accountName || walletBalance == null) {
        navigateReplace('landingScreen');
        throw new Error('Critical account data missing');
      }

      await updateUser({
        accountName,
        accountNumber,
        walletBalance,
      });

      return data;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
    retry: false,
    onError: (error) => {
      const cached = queryClient.getQueryData(['dashboard']);
      if (!cached) {
        Toast.show({ type: 'error', text1: 'An Error Occurred', text2: 'Account Not Found' });
        navigateReplace('landingScreen');
        return;
      }
      Toast.show({
        type: 'error',
        text1: 'An Error Occurred',
        text2: trimMessage(error?.message),
      });
    },
  });

  const limitedTransactions = dashData?.transactionHistory?.slice(0, 5) ?? [];
  const transactionGroups = limitedTransactions.length
    ? groupTransactionsByDate(limitedTransactions)
    : null;

  const firstName =
    userDetails?.firstName ??
    dashData?.accountName?.split(' ')?.[0] ??
    'there';

  const accountTier = formatTier(userDetails?.customerKycTier);
  const upgradeLabel = getUpgradeLabel(userDetails?.customerKycTier);

  const services = [
    { name: 'Transfer', icon: 'swap-horizontal', color: '#FCE7F3', iconColor: '#BE185D', link: 'transferType' },
    { name: 'Savings', icon: 'wallet', color: '#FEF3C7', iconColor: '#D97706', link: 'save' },
    { name: 'RizeCopp', icon: 'chatbubbles', color: '#CFFAFE', iconColor: '#0891B2', link: 'rizeCoopOptions' },
    { name: 'Loan', icon: 'home', color: '#D9F99D', iconColor: '#65A30D', link: 'loanData' },
    { name: 'Self Service', icon: 'card', color: '#E9D5FF', iconColor: '#7C3AED', link: 'securitySetting' },
    { name: 'Utilities', icon: 'stats-chart', color: '#DBEAFE', iconColor: '#2563EB', link: 'utilitiesOptions' },
  ];

  const goodies = [
    { title: 'Rewards', points: '3,450 points', color: '#A16207', bgColor: '#CA8A04', link: 'referal' },
    { title: 'Referrals', amount: '₦0.00', subtitle: 'Refer and earn', color: '#B91C1C', bgColor: '#DC2626' },
  ];

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ['userDetails'] });
          }}
          tintColor="#0E7490"
          colors={['#0E7490']}
        />
      }>

      {/* ── Header ── */}
      <View className="bg-white px-5 pb-4 pt-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/Ellipse 2.png')}
              className="mr-3 h-10 w-10 rounded-full"
            />
            {isLoading ? (
              <Skeleton width={130} height={16} />
            ) : (
              <Text className="text-base font-semibold text-gray-800">
                Hello {firstName} 👋
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => navigateTo('notification')}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Wallet Balance Card ── */}
      <HomeWalletCard
        balance={
          isLoading
            ? '₦ --'
            : dashData?.walletBalance != null
              ? formatAmount(dashData.walletBalance)
              : '₦ 0.00'
        }
        points="3,145 Points"
        accountNumber={isLoading ? '----------' : (dashData?.accountNumber ?? '----------')}
        accountTier={isLoading ? 'Tier -- Account' : accountTier}
        upgradeLabel={isLoading ? null : upgradeLabel}
        onUpgradePress={upgradeLabel ? () => navigateTo('upgradeAccount') : null}
      />

      {/* ── Over View ── */}
      <View className="mb-4 px-5">
        <Text className="mb-3 text-base font-semibold text-gray-800">Over View</Text>
        <View className="flex-row flex-wrap justify-between">
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              className="mb-4 w-[30%] items-center justify-center rounded-xl p-4 shadow-xl"
              style={{ backgroundColor: service.color }}
              onPress={() => navigateTo(service?.link)}
              activeOpacity={0.7}>
              <Ionicons name={service.icon} size={28} color={service.iconColor} />
              <Text className="mt-2 text-xs font-medium text-gray-700">{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Goodies ── */}
      <View className="mb-4 px-5">
        <Text className="mb-3 text-base font-semibold text-gray-800">Goodies</Text>
        <View className="flex-row justify-between">
          {goodies.map((goodie, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateTo(goodie?.link)}
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
                    Gold Tier
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Transaction History ── */}
      <View className="px-5 pb-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-gray-800">Transaction History</Text>
          <TouchableOpacity onPress={() => console.log('View All clicked')}>
            <Text className="text-sm font-medium text-[#0E7490]">View All</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View>
            <Skeleton width={40} height={11} style={{ marginBottom: 8 }} />
            <TransactionSkeleton />
          </View>
        ) : transactionGroups ? (
          Object.entries(transactionGroups).map(([dateLabel, txs]) => (
            <View key={dateLabel} className="mb-4">
              <Text className="mb-2 text-xs text-gray-500">{dateLabel}</Text>
              <View style={{ borderRadius: 12, backgroundColor: 'white', overflow: 'hidden' }}>
                {txs.map((tx) => (
                  <TransactionItem key={tx?.id ?? tx?.transactionId} tx={tx} />
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={{ borderRadius: 12, backgroundColor: 'white', overflow: 'hidden' }}>
            <EmptyTransactions />
          </View>
        )}
      </View>
    </ScrollView>
  );
}