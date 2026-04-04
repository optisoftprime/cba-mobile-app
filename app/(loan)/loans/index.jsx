// screens/LoanList.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Header from 'components/header';
import { navigateBack, navigateReplace } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import EmptyState from 'components/EmptyState';
import { Colors } from 'config/theme';
import { getMyLoans } from 'api/loans';

const formatAmount = (amount) =>
  `₦${Number(amount ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-NG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const statusColor = (status) => {
  if (!status) return '#6B7280';
  const s = status.toLowerCase();
  if (s === 'approved' || s === 'active') return '#16A34A';
  if (s === 'pending') return '#D97706';
  if (s === 'rejected' || s === 'defaulted') return '#DC2626';
  return '#6B7280';
};

export default function LoanList() {
  const {
    data: loans = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['myLoans'],
    queryFn: async () => {
      const response = await getMyLoans();
      if (response?.ok && response?.data?.data) {
        return response.data.data;
      }
      Toast.show({
        type: 'error',
        text1: 'Failed to load loans',
        text2: response?.message,
      });
      return [];
    },
    staleTime: 1000 * 60 * 2,
  });

  const paidCount = (loan) =>
    loan.repaymentScheduledDates?.filter((r) => r.paid || r.paidOff).length ?? 0;

  const totalCount = (loan) => loan.repaymentScheduledDates?.length ?? 0;

  const progressPercent = (loan) => {
    const total = totalCount(loan);
    if (total === 0) return 0;
    return Math.round((paidCount(loan) / total) * 100);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors?.primary]}
            tintColor={Colors?.primary}
          />
        }>
        <Header title="My Loans" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

        <WalletBalanceCard
          walletName="Loan Wallet"
          balance="₦0.00"
          description="5% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color={Colors?.primary || '#157196'}
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={false}
          containerClassName="mx-5 mb-8"
        />

        <View className="px-4">
          <TouchableOpacity
            onPress={() => navigateReplace('loanForm')}
            className="mb-6 items-center py-3">
            <Text className="text-sm font-semibold" style={{ color: Colors?.primary }}>
              Apply for a New Loan
            </Text>
          </TouchableOpacity>

          {isLoading ? (
            <EmptyState
              title="Loading your loans..."
              subtitle="Please wait a moment"
              iconName="time-outline"
            />
          ) : loans.length === 0 ? (
            <EmptyState
              title="No loans found"
              subtitle="You haven't taken any loans yet. Apply for one to get started."
              iconName="cash-outline"
            />
          ) : (
            loans.map((loan, index) => {
              const progress = progressPercent(loan);
              return (
                <View
                  key={loan.loanCode ?? index}
                  className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
                  <View className="flex-row">
                    <View className="mr-4 h-28 w-28 items-center justify-center overflow-hidden rounded-xl">
                      <Image
                        source={require('../../../assets/Frame 427320095.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Amount: </Text>
                        {formatAmount(loan.principalAmount)}
                      </Text>
                      <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Total Repayment: </Text>
                        {formatAmount(loan.totalRepaymentAmount)}
                      </Text>
                      <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Interest Rate: </Text>
                        {loan.interestRate}%
                      </Text>
                      <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Tenure: </Text>
                        {loan.tenureDuration} {loan.tenureType}
                      </Text>
                      <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Next Repayment: </Text>
                        {formatDate(loan.nextRepaymentDate)}
                      </Text>
                      <Text className="mb-2 text-xs" style={{ color: Colors?.primary }}>
                        <Text className="font-semibold">Status: </Text>
                        <Text style={{ color: statusColor(loan.loanStatus) }}>
                          {loan.loanStatus ?? '—'}
                        </Text>
                      </Text>

                      <View className="mb-1 h-2 overflow-hidden rounded-full bg-gray-200">
                        <View
                          className="h-full"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: Colors?.primary,
                          }}
                        />
                      </View>
                      <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
                        {paidCount(loan)}/{totalCount(loan)} repayments
                      </Text>

                      <TouchableOpacity
                        onPress={() => console.log('Loan details:', JSON.stringify(loan, null, 2))}
                        className="items-center rounded-lg py-2"
                        style={{ backgroundColor: Colors?.primary }}>
                        <Text className="text-xs font-semibold text-white">View Loan Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
