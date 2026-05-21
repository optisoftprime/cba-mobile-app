// screens/LoanTransactionDetail.jsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import { Colors } from 'config/theme';
import { formatAmount, formatDate } from 'helper';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatusConfig = (status) => {
  const s = (status ?? '').toLowerCase();
  if (s === 'paid')
    return { color: '#16A34A', bgColor: '#DCFCE7', icon: 'checkmark-circle', label: 'Paid' };
  if (s === 'active')
    return { color: '#2563EB', bgColor: '#DBEAFE', icon: 'radio-button-on', label: 'Active' };
  if (s === 'pending')
    return { color: '#D97706', bgColor: '#FEF3C7', icon: 'time', label: 'Pending' };
  if (s === 'overdue')
    return { color: '#DC2626', bgColor: '#FEE2E2', icon: 'alert-circle', label: 'Overdue' };
  if (s === 'defaulted')
    return { color: '#7C3AED', bgColor: '#EDE9FE', icon: 'close-circle', label: 'Defaulted' };
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

// ─── Summary Tile ─────────────────────────────────────────────────────────────

function SummaryTile({ label, value, color }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}>
      <Text style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4, textAlign: 'center' }}>
        {label}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: '700', color: color ?? '#111827', textAlign: 'center' }}>
        {value}
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function LoanTransactionDetail() {
  const params = useLocalSearchParams();

  let item = {};
  try {
    item = params?.item ? JSON.parse(params.item) : {};
  } catch {
    item = {};
  }

  const statusConfig = getStatusConfig(item.loanStatus);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <Header
        title="Loan Details"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

        {/* Loan Code + Status */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 8 }}>
            Loan ID: <Text style={{ fontWeight: '700', color: '#374151' }}>{item.loanCode ?? '—'}</Text>
          </Text>
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

        {/* Principal Amount highlight */}
        <View
          style={{
            backgroundColor: Colors?.primary || '#157196',
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>
            Principal Amount
          </Text>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#fff' }}>
            {formatAmount(item.principalAmount)}
          </Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
            Account • {item.accountNumber ?? '—'}
          </Text>
        </View>

        {/* Summary Tiles */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <SummaryTile
            label="Total Repayment"
            value={formatAmount(item.totalRepaymentAmount)}
            color={Colors?.primary}
          />
          <SummaryTile
            label="Total Interest"
            value={formatAmount(item.totalInterestRate)}
            color="#D97706"
          />
          <SummaryTile
            label="Processing Fee"
            value={formatAmount(item.processingFeeAmount)}
            color="#6B7280"
          />
        </View>

        {/* Loan Details Card */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            paddingHorizontal: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
          <Text style={{ fontSize: 13, fontWeight: '700', color: '#374151', paddingVertical: 14 }}>
            Loan Information
          </Text>
          <DetailRow label="Interest Rate" value={`${item.interestRate ?? '—'}%`} />
          <DetailRow label="Interest Type" value={item.interestType?.replace(/_/g, ' ')} />
          <DetailRow label="Tenure" value={item.tenureDuration != null ? `${item.tenureDuration} ${item.tenureType ?? ''}` : '—'} />
          <DetailRow label="Repayment Frequency" value={item.repaymentFrequency} />
          <DetailRow label="Repayment Start" value={formatDate(item.repaymentStartDate)} />
          <DetailRow
            label="Next Repayment"
            value={formatDate(item.nextRepaymentDate)}
            valueStyle={{ color: Colors?.primary }}
          />
        </View>

        {/* Repayment Schedule Card — only if dates exist */}
        {item.repaymentScheduledDates?.length > 0 && (
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
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#374151', paddingVertical: 14 }}>
              Repayment Schedule
            </Text>
            {item.repaymentScheduledDates.map((date, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: index < item.repaymentScheduledDates.length - 1 ? 1 : 0,
                  borderBottomColor: '#F3F4F6',
                  gap: 12,
                }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: Colors?.fade ?? '#E0F2FE',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: Colors?.primary }}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={{ fontSize: 13, color: '#374151', fontWeight: '500' }}>
                  {formatDate(date)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}