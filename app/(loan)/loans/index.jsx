// screens/LoanList.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Header from 'components/header';
import { navigateBack, navigateReplace } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import EmptyState from 'components/EmptyState';
import Dropdown from 'components/dropDown';
import { Colors } from 'config/theme';
import { getMyLoans } from 'api/loans';
import { formatAmount, formatDate } from 'helper';

const LOAN_FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Declined', value: 'Declined' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Performing', value: 'Performing' },
  { label: 'Not Performing', value: 'Not_Performing' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Running', value: 'Running' },
  { label: 'Over Due', value: 'Over_Due' },
];



const getLoanStatusConfig = (status) => {
  const s = (status ?? '').toLowerCase();
  if (s === 'completed' || s === 'paid')
    return {
      statusColor: '#16A34A',
      progressOverride: 100,
      progressColor: '#16A34A',
      progressLabel: 'Fully paid',
      button: {
        label: 'View Details',
        bgColor: '#16A34A',
        textColor: '#fff',
        icon: 'checkmark-circle-outline',
        disabled: false,
        action: 'details',
      },
    };
  if (s === 'declined')
    return {
      statusColor: '#DC2626',
      progressOverride: 0,
      progressColor: '#DC2626',
      progressLabel: 'Not applicable',
      button: {
        label: 'Loan Declined',
        bgColor: '#FEE2E2',
        textColor: '#DC2626',
        icon: 'close-circle-outline',
        disabled: true,
        action: null,
      },
    };
  if (s === 'processing')
    return {
      statusColor: '#D97706',
      progressOverride: null,
      progressColor: '#D97706',
      progressLabel: null,
      button: {
        label: 'Awaiting Approval',
        bgColor: '#FEF3C7',
        textColor: '#D97706',
        icon: 'time-outline',
        disabled: true,
        action: null,
      },
    };
  if (s === 'approved')
    return {
      statusColor: '#2563EB',
      progressOverride: null,
      progressColor: Colors?.primary,
      progressLabel: null,
      button: {
        label: 'View Details',
        bgColor: Colors?.primary,
        textColor: '#fff',
        icon: 'document-text-outline',
        disabled: false,
        action: 'details',
      },
    };
  if (s === 'due')
    return {
      statusColor: '#DC2626',
      progressOverride: null,
      progressColor: '#DC2626',
      progressLabel: null,
      button: {
        label: 'Make Repayment',
        bgColor: '#DC2626',
        textColor: '#fff',
        icon: 'card-outline',
        disabled: false,
        action: 'repayment',
      },
    };
  if (s === 'running')
    return {
      statusColor: '#16A34A',
      progressOverride: null,
      progressColor: Colors?.primary,
      progressLabel: null,
      button: {
        label: 'Make Repayment',
        bgColor: Colors?.primary,
        textColor: '#fff',
        icon: 'card-outline',
        disabled: false,
        action: 'repayment',
      },
    };
  return {
    statusColor: '#6B7280',
    progressOverride: null,
    progressColor: Colors?.primary,
    progressLabel: null,
    button: {
      label: 'View Details',
      bgColor: Colors?.primary,
      textColor: '#fff',
      icon: 'document-text-outline',
      disabled: false,
      action: 'details',
    },
  };
};

function LoanCard({ loan, onPressDetails, onPressRepayment }) {
  const paidCount = loan.repaymentScheduledDates?.filter((r) => r.paid || r.paidOff).length ?? 0;
  const totalCount = loan.repaymentScheduledDates?.length ?? 0;
  const realProgress = totalCount === 0 ? 0 : Math.round((paidCount / totalCount) * 100);
  const config = getLoanStatusConfig(loan.loanStatus);
  const progress = config.progressOverride !== null ? config.progressOverride : realProgress;
  const { button } = config;
  const progressLabel = config.progressLabel ?? `${paidCount}/${totalCount} repayments`;

  const handlePress = () => {
    if (button.disabled || !button.action) return;
    if (button.action === 'repayment') onPressRepayment?.(loan);
    else onPressDetails?.(loan);
  };

  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
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
            <Text style={{ color: config.statusColor, fontWeight: '600' }}>
              {loan.loanStatus ?? '—'}
            </Text>
          </Text>

          <View className="mb-1 h-2 overflow-hidden rounded-full bg-gray-200">
            <View
              className="h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: config.progressColor }}
            />
          </View>
          <Text className="mb-2 text-right text-xs font-semibold text-gray-700">
            {progressLabel}
          </Text>

          <TouchableOpacity
            onPress={handlePress}
            disabled={button.disabled}
            activeOpacity={button.disabled ? 1 : 0.75}
            className="flex-row items-center justify-center rounded-lg py-2"
            style={{ backgroundColor: button.bgColor, gap: 4, opacity: button.disabled ? 0.9 : 1 }}>
            <Ionicons name={button.icon} size={14} color={button.textColor} />
            <Text className="text-xs font-semibold" style={{ color: button.textColor }}>
              {button.label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function LoanList() {
  const [filterValue, setFilterValue] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

  const selectedFilterLabel =
    LOAN_FILTER_OPTIONS.find((o) => o.value === filterValue)?.label ?? 'All';

  const {
    data: loans = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['myLoans', filterValue],
    queryFn: async () => {
      const params = filterValue !== 'All' ? { status: filterValue } : {};
      const response = await getMyLoans(params);
      if (response?.ok && response?.data?.data) return response.data.data;
      Toast.show({ type: 'error', text1: 'Failed to load loans', text2: response?.message });
      return [];
    },
    staleTime: 0,
  });

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
          containerClassName="mx-5 mb-2"
        />

        <View className="px-5">
          {/* Modal only — no trigger rendered, driven by filterOpen */}
          <Dropdown
            label="Filter Loans"
            placeholder="All"
            value={filterValue}
            options={LOAN_FILTER_OPTIONS}
            onSelect={(val) => setFilterValue(val)}
            isOpen={filterOpen}
            onToggle={() => setFilterOpen((prev) => !prev)}
            search={false}
            hideTrigger
          />

          <View className="mb-6 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => navigateReplace('loanForm')}
              className="items-center py-3">
              <Text className="text-sm font-semibold" style={{ color: Colors?.primary }}>
                Apply for a New Loan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFilterOpen(true)}
              className="flex-row items-center gap-1 rounded-lg border px-3 py-2"
              style={{ borderColor: Colors?.primary }}>
              <Text className="text-xs font-semibold" style={{ color: Colors?.primary }}>
                {selectedFilterLabel}
              </Text>
              <Text className="text-xs" style={{ color: Colors?.primary }}>
                ▾
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <EmptyState
              title="Loading your loans..."
              subtitle="Please wait a moment"
              iconName="time-outline"
            />
          ) : loans.length === 0 ? (
            <EmptyState
              title="No loans found"
              subtitle={
                filterValue !== 'All'
                  ? `No ${selectedFilterLabel.toLowerCase()}s found.`
                  : "You haven't taken any loans yet. Apply for one to get started."
              }
              iconName="cash-outline"
            />
          ) : (
            loans.map((loan, index) => (
              <LoanCard
                key={loan.loanCode ?? index}
                loan={loan}
                onPressDetails={(l) => console.log('View details:', JSON.stringify(l, null, 2))}
                onPressRepayment={(l) => console.log('Make repayment:', JSON.stringify(l, null, 2))}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
