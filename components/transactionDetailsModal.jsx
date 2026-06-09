// components/TransactionDetailModal.jsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Clipboard,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Colors } from 'config/theme';
import { formatAmount } from 'helper';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatFullDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return (
        date.toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }) +
        ', ' +
        date.toLocaleTimeString('en-NG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    );
}

function safeString(value) {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'string') return value.trim() === '' ? '—' : value.trim();
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.length === 0 ? '—' : value.join(', ');
    if (typeof value === 'object') {
        // Try common keys
        const display =
            value?.name || value?.fullName || value?.accountName || value?.label;
        if (display) return String(display);
        return JSON.stringify(value);
    }
    return '—';
}

function getStatusColor(status) {
    const s = status?.toLowerCase();
    if (s === 'successful' || s === 'success' || s === 'approved') return '#059669';
    if (s === 'failed' || s === 'declined' || s === 'rejected') return '#DC2626';
    return '#D97706';
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

function formatAmountNaira(amount) {
    if (amount == null) return '—';
    const num = Number(amount);
    if (isNaN(num)) return '—';
    return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

function getPartTranLabel(code) {
    if (!code) return '—';
    if (code === 'D') return 'Debit';
    if (code === 'C') return 'Credit';
    return code;
}

// ─── PDF Receipt Generator ────────────────────────────────────────────────────

function buildReceiptHTML(tx) {
    const statusColor =
        tx?.status?.toLowerCase() === 'approved' ||
            tx?.status?.toLowerCase() === 'successful' ||
            tx?.status?.toLowerCase() === 'success'
            ? '#059669'
            : tx?.status?.toLowerCase() === 'failed' ||
                tx?.status?.toLowerCase() === 'declined' ||
                tx?.status?.toLowerCase() === 'rejected'
                ? '#DC2626'
                : '#D97706';

    const now = new Date();
    const printDate = now.toLocaleDateString('en-NG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });

    const rows = [
        ['Transaction ID', safeString(tx?.transactionId || tx?.id)],
        ['Reference', safeString(tx?.reference || tx?.transactionRef)],
        ['Transaction Date', formatFullDate(tx?.transactionDate)],
        ['Payment Date', formatFullDate(tx?.paymentDate)],
        ['Transaction Type', safeString(tx?.transactionType)],
        ['Part Tran Type', getPartTranLabel(tx?.partTranType)],
        ['Description', safeString(tx?.description)],
        ['Account Number', safeString(tx?.accountNumber)],
        ['Account Type', safeString(tx?.accountType)],
        ['Customer Name', safeString(tx?.customerName)],
        ['Recipient', safeString(tx?.recipient)],
        ['Branch', safeString(tx?.branch)],
        ['Bank', safeString(tx?.bankName)],
        ['Channel', safeString(tx?.channel)],
        ['GL Code', safeString(tx?.glCode)],
        ['Manager', safeString(tx?.managerName)],
        ['Teller', safeString(tx?.tellerName)],
        ['Fee', tx?.fee != null ? formatAmountNaira(tx.fee) : '—'],
        ['Ledger Balance After', tx?.ledgerAmount != null ? formatAmountNaira(tx.ledgerAmount) : '—'],
        ['Status', safeString(tx?.status)],
    ].filter(([, v]) => v && v !== '—');

    const tableRows = rows
        .map(
            ([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? '#F9FAFB' : '#FFFFFF'}">
          <td style="padding:9px 14px;font-size:12px;color:#6B7280;width:45%;border-bottom:1px solid #F3F4F6;">${label}</td>
          <td style="padding:9px 14px;font-size:12px;color:#111827;font-weight:500;border-bottom:1px solid #F3F4F6;">${value}</td>
        </tr>`
        )
        .join('');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background:#fff; color:#111827; }
    .page { width:100%; max-width:680px; margin:0 auto; padding:40px 32px 60px; }

    /* Header */
    .header { display:flex; align-items:center; justify-content:space-between; padding-bottom:20px; border-bottom:3px solid #0E7490; margin-bottom:24px; }
    .org-name { font-size:20px; font-weight:800; color:#0E7490; letter-spacing:-0.3px; }
    .org-powered { font-size:10px; color:#9CA3AF; margin-top:2px; }
    .receipt-label { text-align:right; }
    .receipt-label h2 { font-size:22px; font-weight:700; color:#111827; }
    .receipt-label p { font-size:11px; color:#9CA3AF; margin-top:3px; }

    /* Hero */
    .hero { text-align:center; padding:24px 0 20px; }
    .hero-amount { font-size:40px; font-weight:800; color:#111827; letter-spacing:-1px; }
    .hero-name { font-size:15px; color:#374151; margin-top:6px; }
    .status-badge { display:inline-flex; align-items:center; gap:6px; margin-top:12px; padding:5px 14px; border-radius:20px; font-size:12px; font-weight:600; background:${statusColor === '#059669' ? '#ECFDF5' : statusColor === '#DC2626' ? '#FEF2F2' : '#FFFBEB'
        }; color:${statusColor}; }
    .status-dot { width:7px; height:7px; border-radius:50%; background:${statusColor}; }

    /* Divider */
    .divider { border:none; border-top:1px dashed #D1D5DB; margin:20px 0; }

    /* Table */
    .detail-table { width:100%; border-collapse:collapse; border-radius:10px; overflow:hidden; border:1px solid #E5E7EB; }

    /* Footer */
    .footer { margin-top:28px; text-align:center; }
    .footer-note { font-size:11px; color:#9CA3AF; line-height:1.7; }
    .footer-brand { margin-top:16px; font-size:10px; color:#D1D5DB; }
    .print-date { font-size:10px; color:#D1D5DB; margin-top:6px; }

    /* Watermark area */
    .verified-row { display:flex; justify-content:space-between; align-items:center; margin-top:24px; padding:14px 18px; background:#F0FDF4; border-radius:10px; border:1px solid #BBF7D0; }
    .verified-text { font-size:12px; color:#059669; font-weight:600; }
    .verified-sub { font-size:10px; color:#6EE7B7; margin-top:2px; }
    .qr-placeholder { width:52px; height:52px; border:2px dashed #BBF7D0; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:9px; color:#BBF7D0; text-align:center; line-height:1.3; }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div>
      <div class="org-name">Imodi Imosan</div>
      <div class="org-powered">Powered by Optisoft Technology Limited</div>
    </div>
    <div class="receipt-label">
      <h2>RECEIPT</h2>
      <p>Official Transaction Receipt</p>
    </div>
  </div>

  <!-- Hero -->
  <div class="hero">
    <div class="hero-amount">${formatAmountNaira(tx?.amount)}</div>
    <div class="hero-name">${safeString(tx?.customerName)}</div>
    <div class="status-badge">
      <span class="status-dot"></span>
      ${safeString(tx?.status)}
    </div>
  </div>

  <hr class="divider"/>

  <!-- Detail Table -->
  <table class="detail-table">
    <tbody>
      ${tableRows}
    </tbody>
  </table>

  <!-- Verified row -->
  <div class="verified-row">
    <div>
      <div class="verified-text">✓ Transaction Verified</div>
      <div class="verified-sub">This receipt confirms the transaction above</div>
    </div>
    <div class="qr-placeholder">TX REF</div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p class="footer-note">
      This is an electronically generated receipt and requires no signature.<br/>
      For queries, please contact your branch or customer support.
    </p>
    <p class="footer-brand">Imodi Imosan — Powered by Optisoft Technology Limited</p>
    <p class="print-date">Printed: ${printDate}</p>
  </div>

</div>
</body>
</html>`;
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function DetailRow({ label, value, copyable, onCopy, highlight }) {
    const displayValue = safeString(value);
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 11,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
            }}>
            <Text style={{ fontSize: 12.5, color: '#6B7280', flex: 1 }}>{label}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    flex: 1.6,
                    justifyContent: 'flex-end',
                }}>
                <Text
                    style={{
                        fontSize: 12.5,
                        fontWeight: highlight ? '700' : '500',
                        color: highlight ? '#0E7490' : '#111827',
                        textAlign: 'right',
                        flexShrink: 1,
                    }}
                    numberOfLines={2}>
                    {displayValue}
                </Text>
                {copyable && displayValue !== '—' && (
                    <TouchableOpacity
                        onPress={onCopy}
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <Ionicons
                            name="copy-outline"
                            size={14}
                            color={Colors?.primary ?? '#0E7490'}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

function SectionLabel({ title }) {
    return (
        <View style={{ paddingTop: 16, paddingBottom: 6 }}>
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: '#9CA3AF',
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                }}>
                {title}
            </Text>
        </View>
    );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function TransactionDetailModal({ visible, onClose, transaction: tx }) {
    const [generating, setGenerating] = React.useState(false);

    if (!tx) return null;

    const statusColor = getStatusColor(tx?.status);
    const statusBg = getStatusBg(tx?.status);
    const statusIcon = getStatusIcon(tx?.status);
    const initials = getInitials(tx?.customerName);

    function copyToClipboard(label, value) {
        Clipboard.setString(String(value));
        Toast.show({ type: 'success', text1: 'Copied!', text2: `${label} copied to clipboard` });
    }

    async function handleGenerateReceipt() {
        try {
            setGenerating(true);
            const html = buildReceiptHTML(tx);

            const { uri } = await Print.printToFileAsync({
                html,
                base64: false,
            });

            const canShare = await Sharing.isAvailableAsync();
            if (canShare) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Transaction Receipt',
                    UTI: 'com.adobe.pdf',
                });
            } else {
                Alert.alert('Receipt Ready', 'Receipt saved to: ' + uri);
            }
        } catch (err) {
            console.error('Receipt generation error:', err);
            Alert.alert('Error', 'Could not generate receipt. Please try again.');
        } finally {
            setGenerating(false);
        }
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
                            paddingBottom: 36,
                            maxHeight: '92%',
                        }}>

                        {/* Handle + close */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 24,
                                marginBottom: 20,
                            }}>
                            <View style={{ width: 32 }} />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: 40, height: 4, borderRadius: 2,
                                        backgroundColor: '#D1D5DB',
                                    }}
                                />
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
                            <View
                                style={{
                                    alignItems: 'center',
                                    paddingHorizontal: 24,
                                    marginBottom: 24,
                                }}>
                                {/* Avatar */}
                                <View
                                    style={{
                                        width: 64, height: 64, borderRadius: 32,
                                        backgroundColor: '#E0F2FE',
                                        alignItems: 'center', justifyContent: 'center',
                                        marginBottom: 14,
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 22, fontWeight: '700',
                                            color: '#0369A1',
                                        }}>
                                        {initials}
                                    </Text>
                                </View>

                                <Text
                                    style={{
                                        fontSize: 17, fontWeight: '700',
                                        color: '#111827', textAlign: 'center',
                                        marginBottom: 4,
                                    }}>
                                    {safeString(tx?.customerName) !== '—'
                                        ? tx.customerName
                                        : safeString(tx?.description) !== '—'
                                            ? tx.description
                                            : 'Transaction'}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 30, fontWeight: '800',
                                        color: '#111827', marginBottom: 10,
                                    }}>
                                    {formatAmountNaira(tx?.amount)}
                                </Text>

                                {/* Status badge */}
                                <View
                                    style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        gap: 6, backgroundColor: statusBg,
                                        paddingHorizontal: 14, paddingVertical: 6,
                                        borderRadius: 20,
                                    }}>
                                    <Ionicons name={statusIcon} size={14} color={statusColor} />
                                    <Text
                                        style={{
                                            fontSize: 13, fontWeight: '600',
                                            color: statusColor,
                                        }}>
                                        {tx?.status}
                                    </Text>
                                </View>
                            </View>

                            {/* ── Cards ── */}
                            <View
                                style={{
                                    marginHorizontal: 16,
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: 16,
                                    paddingHorizontal: 16,
                                    paddingBottom: 4,
                                    marginBottom: 12,
                                }}>

                                <SectionLabel title="Transaction Info" />
                                <DetailRow
                                    label="Transaction ID"
                                    value={tx?.transactionId || tx?.id}
                                    copyable
                                    onCopy={() =>
                                        copyToClipboard(
                                            'Transaction ID',
                                            tx?.transactionId || tx?.id
                                        )
                                    }
                                />
                                <DetailRow
                                    label="Reference"
                                    value={tx?.reference || tx?.transactionRef}
                                    copyable
                                    onCopy={() =>
                                        copyToClipboard(
                                            'Reference',
                                            tx?.reference || tx?.transactionRef
                                        )
                                    }
                                />
                                <DetailRow label="Type" value={tx?.transactionType} />
                                <DetailRow
                                    label="Part Tran Type"
                                    value={getPartTranLabel(tx?.partTranType)}
                                />
                                <DetailRow label="Description" value={tx?.description} />
                                <DetailRow
                                    label="Transaction Date"
                                    value={formatFullDate(tx?.transactionDate)}
                                />
                                <DetailRow
                                    label="Payment Date"
                                    value={formatFullDate(tx?.paymentDate)}
                                />
                                <DetailRow label="Channel" value={tx?.channel} />

                                <SectionLabel title="Account Details" />
                                <DetailRow
                                    label="Account Number"
                                    value={tx?.accountNumber}
                                    copyable={!!tx?.accountNumber}
                                    onCopy={() =>
                                        copyToClipboard('Account Number', tx?.accountNumber)
                                    }
                                />
                                <DetailRow label="Account Type" value={tx?.accountType} />
                                <DetailRow label="Branch" value={tx?.branch} />
                                <DetailRow label="Bank" value={tx?.bankName} />
                                <DetailRow label="GL Code" value={tx?.glCode} />

                                <SectionLabel title="People" />
                                <DetailRow label="Customer" value={tx?.customerName} />
                                <DetailRow label="Recipient" value={tx?.recipient} />
                                <DetailRow label="Manager" value={tx?.managerName} />
                                <DetailRow label="Teller" value={tx?.tellerName} />

                                <SectionLabel title="Financials" />
                                <View style={{ paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12.5, color: '#6B7280' }}>Amount</Text>
                                    <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#111827' }}>
                                        {formatAmountNaira(tx?.amount)}
                                    </Text>
                                </View>
                                <View style={{ paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12.5, color: '#6B7280' }}>Fee</Text>
                                    <Text style={{ fontSize: 12.5, fontWeight: '500', color: '#111827' }}>
                                        {tx?.fee != null ? formatAmountNaira(tx.fee) : '—'}
                                    </Text>
                                </View>
                                <View style={{ paddingVertical: 11, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 12.5, color: '#6B7280' }}>Ledger Balance After</Text>
                                    <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#0E7490' }}>
                                        {tx?.ledgerAmount != null ? formatAmountNaira(tx.ledgerAmount) : '—'}
                                    </Text>
                                </View>
                            </View>

                            {/* ── Generate Receipt Button ── */}
                            <TouchableOpacity
                                onPress={handleGenerateReceipt}
                                activeOpacity={0.8}
                                disabled={generating}
                                style={{
                                    marginHorizontal: 16,
                                    marginTop: 4,
                                    backgroundColor:
                                        generating ? '#9CA3AF' : Colors?.primary ?? '#0E7490',
                                    borderRadius: 12,
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: 8,
                                }}>
                                {generating ? (
                                    <>
                                        <ActivityIndicator size="small" color="white" />
                                        <Text
                                            style={{
                                                color: 'white', fontWeight: '600',
                                                fontSize: 15,
                                            }}>
                                            Generating...
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        <Ionicons name="document-text-outline" size={18} color="white" />
                                        <Text
                                            style={{
                                                color: 'white', fontWeight: '600',
                                                fontSize: 15,
                                            }}>
                                            Generate Receipt
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                <Toast />
            </View>
        </Modal>
    );
}