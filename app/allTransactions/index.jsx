import { getTransactionHistory } from 'api/transactions';
import { loadSecure } from 'config/storage';
import { baseUrl, orgKey, routes } from 'config/backendConfig';
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

import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

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

    const [isDownloading, setIsDownloading] = useState(false);
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

    async function handleDownloadStatement(format) {
        setShowFormatModal(false);
        setIsDownloading(true);

        try {
            const auth = await loadSecure('auth');

            const isExcel = format === 'excel';
            const extension = isExcel ? 'xlsx' : 'pdf';
            const mimeType = isExcel
                ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : 'application/pdf';
            const UTI = isExcel ? 'com.microsoft.excel.xlsx' : 'com.adobe.pdf';
            const filename = `Statement_${formatDateParam(appliedStart)}_to_${formatDateParam(appliedEnd)}.${extension}`;
            const fileUri = `${FileSystem.documentDirectory}${filename}`;

            // Build query params
            const params = new URLSearchParams({
                startDate: formatDateParam(appliedStart),
                endDate: formatDateParam(appliedEnd),
                format,
            }).toString();

            const downloadUrl = `${baseUrl}${routes?.downloadStatement}?${params}`;

            // Use createDownloadResumable — downloads binary directly to disk,
            // no string conversion, no base64 corruption, supports auth headers
            const downloadResumable = FileSystem.createDownloadResumable(
                downloadUrl,
                fileUri,
                {
                    headers: {
                        'x-org-key': orgKey,
                        ...(auth?.accessToken && {
                            Authorization: `Bearer ${auth.accessToken}`,
                        }),
                    },
                }
            );

            const result = await downloadResumable.downloadAsync();

            if (!result?.uri) {
                Toast.show({ type: 'error', text1: 'Failed', text2: 'Download failed' });
                return;
            }

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(result.uri, {
                    mimeType,
                    dialogTitle: 'Save Statement',
                    UTI,
                });
                Toast.show({ type: 'success', text1: 'Success', text2: 'Statement ready to save' });
            } else {
                Toast.show({ type: 'success', text1: 'Saved', text2: `Saved to: ${result.uri}` });
            }

        } catch (error) {
            console.error('Statement generation error:', error);
            Toast.show({ type: 'error', text1: 'Error', text2: 'Something went wrong while downloading' });
        } finally {
            setIsDownloading(false);
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

                    <TouchableOpacity
                        onPress={() => setShowFormatModal(true)}
                        disabled={isDownloading}
                        activeOpacity={0.8}
                        style={{
                            flex: 1,
                            backgroundColor: isDownloading ? '#E5E7EB' : '#F0FDF4',
                            borderWidth: 1,
                            borderColor: isDownloading ? '#E5E7EB' : '#059669',
                            borderRadius: 10,
                            paddingVertical: 11,
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 6,
                        }}>
                        <Ionicons
                            name="download-outline"
                            size={16}
                            color={isDownloading ? '#9CA3AF' : '#059669'}
                        />
                        <Text
                            style={{
                                color: isDownloading ? '#9CA3AF' : '#059669',
                                fontWeight: '600',
                                fontSize: 14,
                            }}>
                            {isDownloading ? 'Downloading...' : 'Statement'}
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
                onSelect={handleDownloadStatement}
                isDownloading={isDownloading}
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