import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import TextInputComponent from 'components/textInputs';
import EnterPINModal from 'components/EnterPINModal';
import { RecipientSuggestion } from './RecipientSuggestion.jsx';
import { useWalletTransfer } from './useWalletTransfer';

export default function WalletToWalletTransfer() {
  const {
    walletNumber,
    amount,
    narration,
    setNarration,
    validatedAccount,
    validating,
    validationError,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    pinModalVisible,
    setPinModalVisible,
    submitting,
    handleWalletNumberChange,
    handleSelectSuggestion,
    handleAmountChange,
    handleContinue,
    handlePinConfirm,
  } = useWalletTransfer();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Header
          title="Wallet to Wallet"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-6">
          {/* ── Wallet input + floating suggestions ── */}
          <View style={{ zIndex: 10 }}>
            <TextInputComponent
              label="Recipient Wallet Number"
              value={walletNumber}
              onChangeText={handleWalletNumberChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter 10-digit wallet number"
              keyboardType="number-pad"
              maxLength={10}
              isLoading={validating}
              containerStyle={{ marginBottom: 0 }}
            />

            {showSuggestions && !validatedAccount && !validationError && suggestions.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 78,
                  left: 0,
                  right: 0,
                  zIndex: 999,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                  maxHeight: 320,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                    backgroundColor: '#FAFAFA',
                  }}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text
                    style={{ marginLeft: 6, fontSize: 12, color: '#6B7280', fontWeight: '500' }}>
                    Recent recipients
                  </Text>
                </View>

                <ScrollView
                  scrollEnabled
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}>
                  {suggestions.map((tx) => (
                    <RecipientSuggestion
                      key={tx.accountNumber}
                      tx={tx}
                      onPress={handleSelectSuggestion}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={{ marginBottom: 16 }} />

          {/* ── Verified account card ── */}
          {validatedAccount && (
            <View
              className="mb-5 flex-row items-center rounded-xl px-4 py-3"
              style={{ backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' }}>
              <View
                className="mr-3 h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: '#DCFCE7' }}>
                <Ionicons name="checkmark" size={18} color="#16A34A" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-green-600">Account verified</Text>
                <Text className="text-sm font-bold text-green-800">
                  {validatedAccount.accountName}
                </Text>
                <Text className="text-xs text-green-600">{validatedAccount.accountNumber}</Text>
              </View>
            </View>
          )}

          {/* ── Validation error card ── */}
          {validationError ? (
            <View
              className="mb-5 flex-row items-center rounded-xl px-4 py-3"
              style={{ backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' }}>
              <View
                className="mr-3 h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: '#FEE2E2' }}>
                <Ionicons name="close" size={18} color="#DC2626" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-red-500">Verification failed</Text>
                <Text className="text-sm font-semibold text-red-700">{validationError}</Text>
              </View>
            </View>
          ) : null}

          <TextInputComponent
            label="Amount"
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="₦0.00"
            keyboardType="decimal-pad"
            containerStyle={{ marginBottom: 16 }}
          />

          <TextInputComponent
            label="Narration"
            value={narration}
            onChangeText={setNarration}
            placeholder="Enter narration"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{ minHeight: 100 }}
            containerStyle={{ marginBottom: 24 }}
          />
        </View>

        <View className="px-4 pb-6">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>

      <EnterPINModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onConfirm={handlePinConfirm}
        isLoading={submitting}
        title="Enter PIN"
        subtitle="Enter your 4-digit transaction PIN"
      />
    </View>
  );
}