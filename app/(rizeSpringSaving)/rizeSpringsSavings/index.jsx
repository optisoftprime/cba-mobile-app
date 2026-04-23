// screens/RizeSpringList.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  TextInput,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Header from 'components/header';
import { useLocalSearchParams } from 'expo-router';
import { navigateBack, navigateReplace } from 'app/navigate';
import WalletBalanceCard from 'components/walletCard';
import EmptyState from 'components/EmptyState';
import Dropdown from 'components/dropDown';
import { Colors } from 'config/theme';
import { getUserSavingTransactions } from 'api/save';
import { formatAmount, formatDate } from 'helper';

// ─── Constants ───────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = require('../../../assets/Frame 427320095.png');

// These map to the productType query param the backend accepts
const PRODUCT_TYPE_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Fixed', value: 'FIXED' },
  { label: 'Target', value: 'TARGET' },
  { label: 'Group', value: 'GROUP' },
  { label: 'Compulsory', value: 'COMPULSORY' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatusConfig = (status) => {
  const s = (status ?? '').toLowerCase();
  if (s === 'approved')
    return { color: '#16A34A', bgColor: '#DCFCE7', icon: 'checkmark-circle-outline', label: 'Approved' };
  if (s === 'pending')
    return { color: '#D97706', bgColor: '#FEF3C7', icon: 'time-outline', label: 'Pending' };
  if (s === 'declined' || s === 'rejected')
    return { color: '#DC2626', bgColor: '#FEE2E2', icon: 'close-circle-outline', label: 'Declined' };
  return { color: '#6B7280', bgColor: '#F3F4F6', icon: 'ellipse-outline', label: status ?? '—' };
};

// ─── Custom debounce hook ─────────────────────────────────────────────────────

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ─── SavingCard ───────────────────────────────────────────────────────────────

function SavingCard({ item, onViewDetails }) {
  const config = getStatusConfig(item.approvalStatus);

  return (
    <View className="mb-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row">
        <View className="mr-4 h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <Image
            source={item.savingProductRes?.imageUrl ? { uri: item.savingProductRes.imageUrl } : FALLBACK_IMAGE}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
            <Text className="font-semibold">Product: </Text>
            {item.savingProductRes?.productName ?? '—'}
          </Text>
          <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
            <Text className="font-semibold">Amount: </Text>
            {formatAmount(item.amount)}
          </Text>
          <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
            <Text className="font-semibold">Type: </Text>
            {item.transactionType ?? '—'}
          </Text>
          {item.tenure != null && (
            <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
              <Text className="font-semibold">Tenure: </Text>
              {item.tenure} months
            </Text>
          )}
          <Text className="mb-1 text-xs" style={{ color: Colors?.primary }}>
            <Text className="font-semibold">Date: </Text>
            {formatDate(item.localDateCreatedAt)}
          </Text>
          <Text className="mb-3 text-xs" style={{ color: Colors?.primary }}>
            <Text className="font-semibold">Status: </Text>
            <Text style={{ color: config.color, fontWeight: '600' }}>{config.label}</Text>
          </Text>

          <TouchableOpacity
            onPress={() => onViewDetails?.(item)}
            className="flex-row items-center justify-center rounded-lg py-2"
            style={{ backgroundColor: Colors?.primary, gap: 4 }}>
            <Ionicons name="document-text-outline" size={14} color="#fff" />
            <Text className="text-xs font-semibold text-white">View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ onCreatePlan, filterLabel, onOpenFilter, searchValue, onSearchChange }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    onSearchChange('');
  };

  if (searchOpen) {
    return (
      <View
        className="mb-6 flex-row items-center"
        style={{
          borderWidth: 1,
          borderColor: Colors?.primary,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: '#fff',
          gap: 8,
        }}>
        <Ionicons name="search-outline" size={16} color="#9CA3AF" />
        <TextInput
          ref={inputRef}
          value={searchValue}
          onChangeText={onSearchChange}
          placeholder="Search by product name..."
          placeholderTextColor="#9CA3AF"
          style={{ flex: 1, fontSize: 13, color: '#111827' }}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={closeSearch}>
          <Ionicons name="close-outline" size={20} color={Colors?.primary} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="mb-6 flex-row items-center justify-between">
      <TouchableOpacity onPress={onCreatePlan} className="items-center py-3">
        <Text className="text-sm font-semibold" style={{ color: Colors?.primary }}>
          Create New Savings Plan
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity onPress={openSearch} style={{ padding: 4 }}>
          <Ionicons name="search-outline" size={20} color={Colors?.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onOpenFilter}
          className="flex-row items-center gap-1 rounded-lg border px-3 py-2"
          style={{ borderColor: Colors?.primary }}>
          <Text className="text-xs font-semibold" style={{ color: Colors?.primary }}>
            {filterLabel}
          </Text>
          <Text className="text-xs" style={{ color: Colors?.primary }}>▾</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function RizeSpringList() {
  const { productType: initialProductType = null } = useLocalSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(initialProductType ?? 'All');
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 400);

  const selectedFilterLabel = PRODUCT_TYPE_OPTIONS.find((o) => o.value === filterValue)?.label ?? 'All';

  // ── Build query params ──────────────────────────────────────────────────────
  // Only productName and productType are accepted by the backend
  const buildParams = useCallback(() => {
    const params = {};
    if (debouncedSearch.trim()) params.productName = debouncedSearch.trim();
    if (filterValue !== 'All') params.productType = filterValue;
    return params;
  }, [debouncedSearch, filterValue]);

  const {
    data: savings = [],
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['userSavingTransactions', debouncedSearch, filterValue],
    queryFn: async () => {
      const response = await getUserSavingTransactions(buildParams());
      console.log(JSON.stringify(response, null, 2));
      if (response?.ok && response?.data?.data) return response.data.data;
      Toast.show({ type: 'error', text1: 'Failed to load savings', text2: response?.message });
      return [];
    },
    staleTime: 0,
  });

  const handleWithdraw = () => console.log('Withdraw pressed');
  const handleCreateNewPlan = () => navigateReplace('rizeSpringSavingForm');
  const handleViewDetails = (item) => console.log('View details:', JSON.stringify(item, null, 2));

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors?.primary]}
            tintColor={Colors?.primary}
          />
        }>
        <Header
          title="Saving Transactions"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Rize Spring Savings Wallet"
          balance="₦0.00"
          description="6% Interest Rate"
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#5B4570"
          topRightText="Withdraw"
          topRightAction={handleWithdraw}
          topRightIcon="account-balance-wallet"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={true}
          containerClassName="mx-5 mb-8"
        />

        <View className="px-4">

          {/* Hidden dropdown — triggered by Toolbar filter button */}
          <Dropdown
            label="Filter by Type"
            placeholder="All"
            value={filterValue}
            options={PRODUCT_TYPE_OPTIONS}
            onSelect={(val) => setFilterValue(val)}
            isOpen={filterOpen}
            onToggle={() => setFilterOpen((prev) => !prev)}
            search={false}
            hideTrigger
          />

          <Toolbar
            onCreatePlan={handleCreateNewPlan}
            filterLabel={selectedFilterLabel}
            onOpenFilter={() => setFilterOpen(true)}
            searchValue={searchInput}
            onSearchChange={setSearchInput}
          />

          {/* List */}
          {isLoading ? (
            <EmptyState
              title="Loading your savings..."
              subtitle="Please wait a moment"
              iconName="time-outline"
            />
          ) : savings.length === 0 ? (
            <EmptyState
              title="No savings found"
              subtitle={
                debouncedSearch.trim()
                  ? `No results for "${debouncedSearch.trim()}".`
                  : filterValue !== 'All'
                    ? `No ${selectedFilterLabel.toLowerCase()} savings found.`
                    : "You haven't created any savings plan yet."
              }
              iconName="wallet-outline"
            />
          ) : (
            savings.map((item) => (
              <SavingCard key={item.id} item={item} onViewDetails={handleViewDetails} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}