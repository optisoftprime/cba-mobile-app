import React from 'react';
import { View, Text } from 'react-native';

export function ProductSummaryCard({ product }) {
  if (!product) return null;
  return (
    <View className="mt-3 rounded-lg bg-purple-50 p-3">
      <Text className="text-xs font-medium text-purple-700">
        Min: ₦{product.minTransactionLimit?.toLocaleString()} · Max: ₦
        {product.maxTransactionLimit?.toLocaleString()} · Rate: {product.interestRate}% ·{' '}
        {product.savingProductType} · Tenor: {product.minimumTenor}–{product.maximumTenor}{' '}
        {product.tenorDisplayIn?.replace('IN_', '').toLowerCase()}
      </Text>
    </View>
  );
}

export function SavingsInfoCard({ product }) {
  if (!product || !product.productDescription) return null;
  return (
    <View className="mb-4 rounded-lg bg-blue-50 p-4">
      <Text className="mb-1 font-semibold text-gray-900">About this product</Text>
      <Text className="text-sm text-gray-700">{product.productDescription}</Text>
    </View>
  );
}
