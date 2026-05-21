// screens/SavingTransactionDetail.jsx
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import { Colors } from 'config/theme';
import { formatAmount, formatDate } from 'helper';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FALLBACK_IMAGE = require('../../assets/Frame 427320095.png');

const getStatusConfig = (status) => {
    const s = (status ?? '').toLowerCase();
    if (s === 'approved')
        return { color: '#16A34A', bgColor: '#DCFCE7', icon: 'checkmark-circle', label: 'Approved' };
    if (s === 'pending')
        return { color: '#D97706', bgColor: '#FEF3C7', icon: 'time', label: 'Pending' };
    if (s === 'declined' || s === 'rejected')
        return { color: '#DC2626', bgColor: '#FEE2E2', icon: 'close-circle', label: 'Declined' };
    return { color: '#6B7280', bgColor: '#F3F4F6', icon: 'ellipse', label: status ?? '—' };
};

// ─── Detail Row ───────────────────────────────────────────────────────────────

function DetailRow({ label, value, valueStyle }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
            }}>
            <Text style={{ fontSize: 13, color: '#6B7280', flex: 1 }}>{label}</Text>
            <Text
                style={[{ fontSize: 13, fontWeight: '600', color: '#111827', textAlign: 'right', flex: 1 }, valueStyle]}
                numberOfLines={2}>
                {value ?? '—'}
            </Text>
        </View>
    );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SavingTransactionDetail() {
    const params = useLocalSearchParams();

    // Parse the item passed as JSON string from navigateTo
    let item = {};
    try {
        item = params?.item ? JSON.parse(params.item) : {};
    } catch {
        item = {};
    }

    const statusConfig = getStatusConfig(item.approvalStatus);
    const product = item.savingProductRes ?? {};

    return (
        <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <Header
                title="Transaction Details"
                onLeftPress={navigateBack}
                showLeftIcon={true}
                color="black"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

                {/* Product Image + Name */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: '#E5E7EB',
                            marginBottom: 12,
                        }}>
                        <Image
                            source={product.imageUrl ? { uri: product.imageUrl } : FALLBACK_IMAGE}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 }}>
                        {product.productName ?? '—'}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{product.productCode ?? ''}</Text>
                </View>

                {/* Status Badge */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 999,
                            backgroundColor: statusConfig.bgColor,
                        }}>
                        <Ionicons name={statusConfig.icon} size={16} color={statusConfig.color} />
                        <Text style={{ fontSize: 13, fontWeight: '700', color: statusConfig.color }}>
                            {statusConfig.label}
                        </Text>
                    </View>
                </View>

                {/* Amount highlight */}
                <View
                    style={{
                        backgroundColor: Colors?.primary || '#157196',
                        borderRadius: 16,
                        padding: 20,
                        alignItems: 'center',
                        marginBottom: 24,
                    }}>
                    <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
                        Transaction Amount
                    </Text>
                    <Text style={{ fontSize: 32, fontWeight: '800', color: '#fff' }}>
                        {formatAmount(item.amount)}
                    </Text>
                </View>

                {/* Details Card */}
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        paddingHorizontal: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                    }}>
                    <DetailRow label="Transaction Type" value={item.transactionType} />
                    <DetailRow label="Savings Type" value={product.savingProductType} />
                    <DetailRow label="Account Number" value={item.accountNumber} />
                    {item.tenure != null && (
                        <DetailRow label="Tenure" value={`${item.tenure} months`} />
                    )}
                    <DetailRow label="Date Created" value={formatDate(item.localDateCreatedAt)} />
                    <DetailRow label="Last Updated" value={formatDate(item.localDateTimeUpdatedAt)} />
                    <DetailRow
                        label="Transaction ID"
                        value={`#${item.id}`}
                        valueStyle={{ color: Colors?.primary }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}