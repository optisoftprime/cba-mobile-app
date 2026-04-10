import React from 'react';
import { View, Text } from 'react-native';

// ─── Product summary pill shown beneath the product dropdown ─────────────────

export function ProductSummaryCard({ product }) {
    if (!product) return null;
    return (
        <View className="mt-3 rounded-lg bg-purple-50 p-3">
            <Text className="text-xs font-medium text-purple-700">
                Min: ₦{product.minimumLoanAmount?.toLocaleString()} · Max: ₦
                {product.maximumLoanAmount?.toLocaleString()} · Rate: {product.interestRate}% ·{' '}
                {product.interestType?.replace(/_/g, ' ')}
            </Text>
        </View>
    );
}

// ─── Fees breakdown card ──────────────────────────────────────────────────────

export function FeesCard({ fees }) {
    if (!fees?.length) return null;
    return (
        <View className="mb-6 rounded-lg bg-blue-50 p-4">
            <Text className="mb-3 font-semibold text-gray-900">Fees</Text>
            {fees.map((fee) => (
                <View key={fee.label} className="mb-1 flex-row items-center justify-between">
                    <Text className="text-sm text-gray-700">• {fee.label}</Text>
                    <Text className="text-sm font-medium text-gray-900">{fee.value}</Text>
                </View>
            ))}
        </View>
    );
}