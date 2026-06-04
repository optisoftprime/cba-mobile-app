import { getTransactionHistory, downloadStatement } from 'api/transactions';
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import { formatAmount } from 'helper';
import Toast from 'react-native-toast-message';
import TransactionDetailModal from './../../components/transactionDetailsModal';
import StatementFormatModal from './../../components/statementFormatModal';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateParam(date) {
    return date.toISOString().split('T')[0];
}

function formatDisplayDate(date) {
    return date.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

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
            {[1, 2, 3, 4, 5].map((i) => (
                <View
                    key={i}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderBottomWidth: i < 5 ? 1 : 0,
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

function TransactionItem({ tx, onPress }) {
    const isSuccessful =
        tx?.status?.toLowerCase() === 'successful' ||
        tx?.status?.toLowerCase() === 'success' ||
        tx?.status?.toLowerCase() === 'approved';

    const initials = tx?.customerName
        ? tx.customerName
            .split(' ')
            .slice(0, 2)
            .map((n) => n.charAt(0).toUpperCase())
            .join('')
        : '?';

    return (
        <TouchableOpacity
            onPress={() => onPress(tx)}
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
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
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
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#4B5563' }}>No transactions found</Text>
            <Text style={{ marginTop: 4, fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
                Try adjusting your date range
            </Text>
        </View>
    );
}

// ─── Date Picker Button ───────────────────────────────────────────────────────

function DatePickerButton({ label, date, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: 'white',
            }}>
            <Text style={{ fontSize: 10, color: '#9CA3AF', marginBottom: 2 }}>{label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, fontWeight: '500', color: '#1F2937' }}>
                    {formatDisplayDate(date)}
                </Text>
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            </View>
        </TouchableOpacity>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AllTransactions() {
    const today = new Date();

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [appliedStart, setAppliedStart] = useState(today);
    const [appliedEnd, setAppliedEnd] = useState(today);

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [isSending, setIsSending] = useState(false);
    const [showFormatModal, setShowFormatModal] = useState(false);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['transactionHistory', formatDateParam(appliedStart), formatDateParam(appliedEnd)],
        queryFn: async () => {
            const response = await getTransactionHistory({
                startDate: formatDateParam(appliedStart),
                endDate: formatDateParam(appliedEnd),
            });
            if (!response?.ok) throw new Error(response?.message);
            return response?.data?.data ?? [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const transactionGroups = data?.length ? groupTransactionsByDate(data) : null;

    function handleApplyFilter() {
        if (startDate > endDate) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Range',
                text2: 'Start date must be before end date',
            });
            return;
        }
        setAppliedStart(startDate);
        setAppliedEnd(endDate);
    }

    function handleTransactionPress(tx) {
        setSelectedTransaction(tx);
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
        setSelectedTransaction(null);
    }

    async function handleRequestStatement(format) {
        setShowFormatModal(false);
        setIsSending(true);

        try {
            const response = await downloadStatement({
                startDate: formatDateParam(appliedStart),
                endDate: formatDateParam(appliedEnd),
                format,
            });

            if (response?.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Statement Sent',
                    text2: 'Your statement has been sent to your email.',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed',
                    text2: response?.message || 'Could not send statement. Please try again.',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSending(false);
        }
    }

    return (
        <View className="flex-1 bg-gray-50">
            <Header
                title="Transaction History"
                onLeftPress={() => navigateBack()}
                showLeftIcon={true}
                color="black"
            />

            {/* ── Date Filter ── */}
            <View
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                }}>
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                    <DatePickerButton
                        label="Start Date"
                        date={startDate}
                        onPress={() => setShowStartPicker(true)}
                    />
                    <DatePickerButton
                        label="End Date"
                        date={endDate}
                        onPress={() => setShowEndPicker(true)}
                    />
                </View>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {/* Filter Button */}
                    <TouchableOpacity
                        onPress={handleApplyFilter}
                        activeOpacity={0.8}
                        style={{
                            flex: 1,
                            backgroundColor: '#0E7490',
                            borderRadius: 10,
                            paddingVertical: 11,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 6,
                        }}>
                        <Ionicons name="filter-outline" size={16} color="white" />
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Filter</Text>
                    </TouchableOpacity>

                    {/* Statement Button */}
                    <TouchableOpacity
                        onPress={() => setShowFormatModal(true)}
                        disabled={isSending}
                        activeOpacity={0.8}
                        style={{
                            flex: 1,
                            backgroundColor: isSending ? '#E5E7EB' : '#F0FDF4',
                            borderWidth: 1,
                            borderColor: isSending ? '#E5E7EB' : '#059669',
                            borderRadius: 10,
                            paddingVertical: 11,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 6,
                        }}>
                        <Ionicons
                            name="mail-outline"
                            size={16}
                            color={isSending ? '#9CA3AF' : '#059669'}
                        />
                        <Text
                            style={{
                                color: isSending ? '#9CA3AF' : '#059669',
                                fontWeight: '600',
                                fontSize: 14,
                            }}>
                            {isSending ? 'Sending...' : 'Statement'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ── Date Pickers ── */}
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    maximumDate={endDate}
                    onChange={(event, selected) => {
                        setShowStartPicker(false);
                        if (selected) setStartDate(selected);
                    }}
                />
            )}
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={startDate}
                    maximumDate={today}
                    onChange={(event, selected) => {
                        setShowEndPicker(false);
                        if (selected) setEndDate(selected);
                    }}
                />
            )}

            {/* ── Transaction List ── */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-4 py-4">
                    {isLoading ? (
                        <TransactionSkeleton />
                    ) : transactionGroups ? (
                        Object.entries(transactionGroups).map(([dateLabel, txs]) => (
                            <View key={dateLabel} className="mb-4">
                                <Text className="mb-2 text-xs text-gray-500">{dateLabel}</Text>
                                <View
                                    style={
                                        Platform.OS === 'android'
                                            ? {
                                                borderRadius: 12,
                                                backgroundColor: 'white',
                                                elevation: 2,
                                                overflow: 'hidden',
                                            }
                                            : {
                                                borderRadius: 12,
                                                backgroundColor: 'white',
                                                overflow: 'hidden',
                                                shadowColor: '#000',
                                                shadowOffset: { width: 0, height: 1 },
                                                shadowOpacity: 0.05,
                                                shadowRadius: 3,
                                            }
                                    }>
                                    {txs.map((tx) => (
                                        <TransactionItem
                                            key={tx?.id ?? tx?.transactionId}
                                            tx={tx}
                                            onPress={handleTransactionPress}
                                        />
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <View
                            style={{
                                borderRadius: 12,
                                backgroundColor: 'white',
                                overflow: 'hidden',
                                ...(Platform.OS === 'android' ? { elevation: 2 } : {}),
                            }}>
                            <EmptyTransactions />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* ── Format Picker Modal ── */}
            <StatementFormatModal
                visible={showFormatModal}
                onClose={() => setShowFormatModal(false)}
                onSelect={handleRequestStatement}
                isDownloading={isSending}
            />

            {/* ── Transaction Detail Modal ── */}
            <TransactionDetailModal
                visible={modalVisible}
                onClose={handleCloseModal}
                transaction={selectedTransaction}
            />
        </View>
    );
}