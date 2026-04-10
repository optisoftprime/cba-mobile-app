import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function RecipientSuggestion({ tx, onPress }) {
    const initials = tx.customerName
        ? tx.customerName
            .split(' ')
            .slice(0, 2)
            .map((n) => n.charAt(0).toUpperCase())
            .join('')
        : (tx.accountNumber?.slice(-2) ?? '?');

    return (
        <TouchableOpacity
            onPress={() => onPress(tx)}
            activeOpacity={0.7}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
                backgroundColor: '#fff',
            }}>
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#E0F2FE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#0369A1' }}>{initials}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#1F2937' }} numberOfLines={1}>
                    {tx.customerName || 'Unknown'}
                </Text>
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 1 }}>
                    {tx.accountNumber} • {tx.accountType}
                </Text>
            </View>

            <Ionicons name="arrow-forward" size={16} color="#9CA3AF" />
        </TouchableOpacity>
    );
}