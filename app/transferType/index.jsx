// screens/TransferType.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function TransferType() {
  const [selectedType, setSelectedType] = useState('wallet_to_wallet');

  const transferTypes = [
    { id: 'wallet_to_wallet', label: 'Wallet to Wallet' },
    { id: 'bank_transfer', label: 'Bank Transfer' },
  ];

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
  };

  const handleNext = () => {
    // console.log('Selected transfer type:', selectedType);

    // Navigate based on selection
    if (selectedType === 'wallet_to_wallet') {
      navigateTo('transfer');
    } else if (selectedType === 'bank_transfer') {
      navigateTo('bankTransferForm');
    }
    // navigateTo("bankTransferForm")
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header
          title="Transfer Type"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-8">
          {transferTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-4 py-4"
              activeOpacity={0.7}>
              <View
                className="mr-3 h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400"
                style={selectedType === type.id ? { borderColor: Colors?.primary } : {}}>
                {selectedType === type.id && (
                  <View
                    className="h-3 w-3 rounded-full "
                    style={{ backgroundColor: Colors?.primary, borderRadius: 50 }}
                  />
                )}
              </View>
              <Text className="text-base text-gray-900">{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button - Fixed at Bottom */}
        <View className="mt-10 px-4 pb-6">
          <TouchBtn
            onPress={handleNext}
            label="Next"
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
