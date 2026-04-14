import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Header from 'components/header';
import { navigateBack } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import WalletBalanceCard from 'components/walletCard';
import TextInputComponent from 'components/textInputs';
import { Colors } from 'config/theme';
import { GlobalStatusBar } from 'config/statusBar';
import { ProductSummaryCard, SavingsInfoCard } from './SavingsFormCards';
import { useSavingsApplication } from './useSavingsApplication';

export default function RizeSpringForm() {
  const {
    amount,
    description,
    setDescription,
    transactionMode,
    setTransactionMode,
    tenorDuration,
    setTenorDuration,
    savingAccountNumber,
    setSavingAccountNumber,
    showProductDropdown,
    showTransactionModeDropdown,
    showTenorDropdown,
    selectedProduct,
    loadingProducts,
    bookingSaving,
    isBusy,
    isRefetching,
    refetch,
    productOptions,
    transactionModeOptions,
    tenorOptions,
    amountError,
    handleAmountChange,
    handleProductSelect,
    handleToggleProductDropdown,
    handleToggleTransactionModeDropdown,
    handleToggleTenorDropdown,
    handleBookSaving,
  } = useSavingsApplication();

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
          title="Fixed Savings Plan"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <WalletBalanceCard
          walletName="Savings Wallet"
          balance="₦0.00"
          description={
            selectedProduct
              ? `${selectedProduct.interestRate}% Interest Rate`
              : 'Select a product'
          }
          backgroundImagePath={require('../../../assets/Vector .png')}
          color="#513B56"
          showWalletName={true}
          showBalance={true}
          showBalanceToggle={true}
          showDescription={true}
          showDescriptionButton={false}
          showPoints={false}
          showWalletNumber={false}
          showCopyWallet={false}
          showTopRightButton={false}
          containerClassName="mx-5 mb-8"
        />

        <View className="flex-1 px-5">
          <Dropdown
            label="Savings Product"
            placeholder={loadingProducts ? 'Loading...' : 'Select a savings product'}
            value={selectedProduct ? String(selectedProduct.id) : ''}
            options={loadingProducts ? [] : productOptions}
            onSelect={handleProductSelect}
            isOpen={showProductDropdown && !isBusy}
            onToggle={handleToggleProductDropdown}
            isLoading={isBusy}
            search
          />

          <ProductSummaryCard product={selectedProduct} />
          {/* <SavingsInfoCard product={selectedProduct} /> */}

          <TextInputComponent
            label="Amount"
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="₦0.00"
            keyboardType="decimal-pad"
            error={amountError}
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16, marginTop: 12 }}
          />

          <TextInputComponent
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Saving for a new car"
            returnKeyType="done"
            isLoading={isBusy}
            containerStyle={{ marginBottom: 16 }}
          />

          <Dropdown
            label="Transaction Mode"
            placeholder="Select transaction mode"
            value={transactionMode}
            options={transactionModeOptions}
            onSelect={setTransactionMode}
            isOpen={showTransactionModeDropdown && !isBusy}
            onToggle={handleToggleTransactionModeDropdown}
            isLoading={isBusy}
          />

          <Dropdown
            label="Tenor / Duration"
            placeholder={selectedProduct ? 'Select duration' : 'Select a product first'}
            value={tenorDuration}
            options={tenorOptions}
            onSelect={setTenorDuration}
            isOpen={showTenorDropdown && !isBusy}
            onToggle={handleToggleTenorDropdown}
            isLoading={isBusy}
            style={{ marginTop: 15 }}

          />

          <TextInputComponent
            label="Interest Rate"
            value={selectedProduct ? `${selectedProduct.interestRate}%` : '—'}
            editable={false}
            isLoading={isBusy}
            inputStyle={{ backgroundColor: '#F3F4F6' }}
            containerStyle={{ marginBottom: 16, marginTop: 10 }}
          />

          <TextInputComponent
            label="Saving Account Number"
            value={savingAccountNumber}
            onChangeText={setSavingAccountNumber}
            placeholder="Enter account number"
            keyboardType="number-pad"
            isLoading={isBusy}
            containerStyle={{ marginBottom: 32 }}
          />
        </View>

        <View className="px-5 pb-6">
          <TouchBtn
            onPress={handleBookSaving}
            label="Continue"
            isLoading={bookingSaving}
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