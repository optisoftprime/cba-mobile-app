import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import { ProductSummaryCard, FeesCard } from './LoanFormCards';
import { useLoanApplication } from './useLoanApplication';

export default function LoanApplicationForm() {
  const {
    loanAmount,
    loanPurpose,
    setLoanPurpose,
    repaymentDuration,
    setRepaymentDuration,
    understood,
    showDurationDropdown,
    showProductDropdown,
    selectedProduct,
    loadingProducts,
    bookingLoan,
    isBusy,
    isRefetching,
    refetch,
    productOptions,
    durationOptions,
    productFees,
    loanAmountError,
    totalPayable,
    handleLoanAmountChange,
    handleProductSelect,
    handleToggleDurationDropdown,
    handleToggleProductDropdown,
    handleToggleUnderstood,
    handleBookLoan,
  } = useLoanApplication();

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors?.primary]}
            tintColor={Colors?.primary}
          />
        }>
        <Header
          title="Loan Application Form"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Loan Wallet"
          balance="₦0.00"
          description={
            selectedProduct ? `${selectedProduct.interestRate}% Interest Rate` : '5% Interest Rate'
          }
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#4C1D95"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={true}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={false}
          containerClassName="mx-5 mb-8"
        />

        <View className="flex-1 px-5">
          <Dropdown
            label="Loan Product"
            placeholder={loadingProducts ? 'Loading...' : 'Select a loan product'}
            value={selectedProduct ? String(selectedProduct.id) : ''}
            options={loadingProducts ? [] : productOptions}
            onSelect={handleProductSelect}
            isOpen={showProductDropdown && !isBusy}
            onToggle={handleToggleProductDropdown}
            isLoading={isBusy}
            search
          />

          <ProductSummaryCard product={selectedProduct} />

          <TextInputComponent
            label="Loan Amount"
            value={loanAmount}
            onChangeText={handleLoanAmountChange}
            placeholder="₦0.00"
            keyboardType="decimal-pad"
            error={loanAmountError}
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16, marginTop: 12 }}
          />

          <TextInputComponent
            label="Loan Purpose"
            value={loanPurpose}
            onChangeText={setLoanPurpose}
            placeholder="e.g. Business expansion"
            returnKeyType="done"
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16 }}
          />

          <Dropdown
            label="Repayment Duration"
            placeholder={selectedProduct ? 'Select duration' : 'Select a product first'}
            value={repaymentDuration}
            options={durationOptions}
            onSelect={setRepaymentDuration}
            isOpen={showDurationDropdown && !isBusy}
            onToggle={handleToggleDurationDropdown}
            isLoading={isBusy}
          />

          <TextInputComponent
            label="Interest Rate"
            value={selectedProduct ? `${selectedProduct.interestRate}%` : '—'}
            editable={false}
            isLoading={isBusy}
            inputStyle={{ backgroundColor: '#F3F4F6' }}
            containerStyle={{ marginBottom: 16, marginTop: 10 }}
          />

          <FeesCard fees={productFees} />

          <TouchableOpacity
            onPress={handleToggleUnderstood}
            activeOpacity={isBusy ? 1 : 0.7}
            className="mb-6 flex-row items-center">
            <View
              className="h-5 w-5 items-center justify-center rounded border-2"
              style={{
                borderColor: isBusy ? '#9CA3AF' : understood ? Colors?.primary : 'black',
                backgroundColor: isBusy
                  ? '#F3F4F6'
                  : understood
                    ? Colors?.primary
                    : 'transparent',
              }}>
              {understood && !isBusy && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text
              className="ml-3 flex-1 text-sm"
              style={{ color: isBusy ? '#9CA3AF' : '#111827' }}>
              I understand, I can't withdraw early
            </Text>
          </TouchableOpacity>

          <TextInputComponent
            label="Total Loan Payable"
            value={totalPayable}
            editable={false}
            isLoading={isBusy}
            inputStyle={{ backgroundColor: '#F3F4F6' }}
            containerStyle={{ marginBottom: 32 }}
          />
        </View>

        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleBookLoan}
            label="Continue"
            isLoading={bookingLoan}
            loadingText="Booking..."
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </ScrollView>
    </View>
  );
}