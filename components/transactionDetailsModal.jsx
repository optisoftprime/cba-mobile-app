// components/TransactionDetailModal.jsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Clipboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Colors } from 'config/theme';
import { formatAmount } from 'helper';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatFullDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) + ', ' + date.toLocaleTimeString('en-NG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

function getStatusColor(status) {
    const s = status?.toLowerCase();
    if (s === 'successful' || s === 'success' || s === 'approved') return '#059669';
    if (s === 'failed' || s === 'declined' || s === 'rejected') return '#DC2626';
    return '#D97706'; // pending / unknown
}

function getStatusBg(status) {
    const s = status?.toLowerCase();
    if (s === 'successful' || s === 'success' || s === 'approved') return '#ECFDF5';
    if (s === 'failed' || s === 'declined' || s === 'rejected') return '#FEF2F2';
    return '#FFFBEB';
}

function getStatusIcon(status) {
    const s = status?.toLowerCase();
    if (s === 'successful' || s === 'success' || s === 'approved') return 'checkmark-circle';
    if (s === 'failed' || s === 'declined' || s === 'rejected') return 'close-circle';
    return 'time';
}

function getInitials(name) {
    if (!name) return '?';
    return name
        .split(' ')
        .slice(0, 2)
        .map((n) => n.charAt(0).toUpperCase())
        .join('');
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function DetailRow({ label, value, copyable, onCopy }) {
    if (!value) return null;
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
            }}>
            <Text style={{ fontSize: 13, color: '#6B7280', flex: 1 }}>{label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1.5, justifyContent: 'flex-end' }}>
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: '500',
                        color: '#111827',
                        textAlign: 'right',
                        flexShrink: 1,
                    }}
                    numberOfLines={2}>
                    {value}
                </Text>
                {copyable && (
                    <TouchableOpacity onPress={onCopy} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons name="copy-outline" size={15} color={Colors?.primary ?? '#0E7490'} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function TransactionDetailModal({ visible, onClose, transaction: tx }) {
    if (!tx) return null;

    const statusColor = getStatusColor(tx?.status);
    const statusBg = getStatusBg(tx?.status);
    const statusIcon = getStatusIcon(tx?.status);
    const initials = getInitials(tx?.customerName);

    function copyToClipboard(label, value) {
        Clipboard.setString(value);
        // Toast.show({ type: 'success', text1: 'Copied!', text2: `${label} copied to clipboard` });
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}>
            <View style={{ flex: 1 }}>
                {/* Backdrop */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onClose}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                />

                {/* Sheet */}
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 28,
                            borderTopRightRadius: 28,
                            paddingTop: 20,
                            paddingBottom: 40,
                            maxHeight: '90%',
                        }}>

                        {/* Handle + close */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 20 }}>
                            <View style={{ width: 32 }} />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D1D5DB' }} />
                            </View>
                            <TouchableOpacity
                                onPress={onClose}
                                activeOpacity={0.7}
                                style={{ width: 32, alignItems: 'flex-end' }}>
                                <View
                                    style={{
                                        width: 32, height: 32, borderRadius: 16,
                                        backgroundColor: '#F3F4F6',
                                        alignItems: 'center', justifyContent: 'center',
                                    }}>
                                    <Ionicons name="close" size={18} color="#374151" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* ── Hero ── */}
                            <View style={{ alignItems: 'center', paddingHorizontal: 24, marginBottom: 28 }}>
                                {/* Avatar */}
                                <View
                                    style={{
                                        width: 64, height: 64, borderRadius: 32,
                                        backgroundColor: '#E0F2FE',
                                        alignItems: 'center', justifyContent: 'center',
                                        marginBottom: 16,
                                    }}>
                                    <Text style={{ fontSize: 22, fontWeight: '700', color: '#0369A1' }}>{initials}</Text>
                                </View>

                                {/* Name / description */}
                                <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: 4 }}>
                                    {tx?.customerName || tx?.description || 'Transaction'}
                                </Text>

                                {/* Amount */}
                                <Text style={{ fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 12 }}>
                                    {formatAmount(tx?.amount)}
                                </Text>

                                {/* Status badge */}
                                <View
                                    style={{
                                        flexDirection: 'row', alignItems: 'center', gap: 6,
                                        backgroundColor: statusBg,
                                        paddingHorizontal: 14, paddingVertical: 6,
                                        borderRadius: 20,
                                    }}>
                                    <Ionicons name={statusIcon} size={15} color={statusColor} />
                                    <Text style={{ fontSize: 13, fontWeight: '600', color: statusColor }}>
                                        {tx?.status}
                                    </Text>
                                </View>
                            </View>

                            {/* ── Details Card ── */}
                            <View
                                style={{
                                    marginHorizontal: 16,
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: 16,
                                    paddingHorizontal: 16,
                                    marginBottom: 16,
                                }}>
                                <DetailRow
                                    label="Transaction ID"
                                    value={tx?.transactionId || tx?.id}
                                    copyable
                                    onCopy={() => copyToClipboard('Transaction ID', String(tx?.transactionId || tx?.id))}
                                />
                                <DetailRow
                                    label="Reference"
                                    value={tx?.reference || tx?.transactionRef}
                                    copyable
                                    onCopy={() => copyToClipboard('Reference', String(tx?.reference || tx?.transactionRef))}
                                />
                                <DetailRow
                                    label="Date & Time"
                                    value={formatFullDate(tx?.transactionDate)}
                                />
                                <DetailRow
                                    label="Type"
                                    value={tx?.transactionType}
                                />
                                <DetailRow
                                    label="Description"
                                    value={tx?.description}
                                />
                                <DetailRow
                                    label="Account Number"
                                    value={tx?.accountNumber}
                                    copyable={!!tx?.accountNumber}
                                    onCopy={() => copyToClipboard('Account Number', String(tx?.accountNumber))}
                                />
                                <DetailRow
                                    label="Bank"
                                    value={tx?.bankName}
                                />
                                <DetailRow
                                    label="Channel"
                                    value={tx?.channel}
                                />
                                <View style={{ paddingVertical: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#6B7280' }}>Fee</Text>
                                        <Text style={{ fontSize: 13, fontWeight: '500', color: '#111827' }}>
                                            {tx?.fee != null ? formatAmount(tx.fee) : '—'}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* ── Close button ── */}
                            <TouchableOpacity
                                onPress={onClose}
                                activeOpacity={0.8}
                                style={{
                                    marginHorizontal: 16,
                                    backgroundColor: Colors?.primary ?? '#0E7490',
                                    borderRadius: 12,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                }}>
                                <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                <Toast />
            </View>
        </Modal>
    );
}