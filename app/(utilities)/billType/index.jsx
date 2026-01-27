// screens/ChooseBillType.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { Colors } from 'config/theme';

export default function ChooseBillType() {
  const [selectedType, setSelectedType] = useState('electricity');

  const billTypes = [
    { id: 'electricity', label: 'Electricity' },
    { id: 'cable', label: 'Cable' },
    { id: 'internet', label: 'Internet' },
  ];

  const handleNext = () => {
    console.log('Selected bill type:', selectedType);

    // Navigate based on selection
    if (selectedType === 'electricity') {
      navigateTo('payElectricity');
    } else if (selectedType === 'cable') {
      navigateTo('payCable');
    } else if (selectedType === 'internet') {
      navigateTo('payInternet');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header
          title="Choose Bill Type"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          color="black"
        />

        <View className="flex-1 px-4 pt-8">
          {billTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className="mb-4 flex-row items-center rounded-lg bg-gray-100 px-4 py-4"
              activeOpacity={0.7}>
              <View
                className={`mr-3 h-6 w-6 items-center justify-center rounded-full border-2 ${
                  selectedType === type.id 
                    ? `border-[${Colors?.primary}]` 
                    : 'border-gray-400'
                }`}>
                {selectedType === type.id && (
                  <View 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: Colors?.primary }} 
                  />
                )}
              </View>
              <Text className="text-base text-gray-900">{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button - Fixed at Bottom */}
        <TouchBtn
          onPress={handleNext}
          label="Next"
          backgroundColor={Colors?.primary}
          textColor="white"
          buttonClassName="items-center rounded-lg py-4"
          textClassName="text-base font-semibold"
          containerClassName="mt-10 px-4 pb-6"
          activeOpacity={0.8}
        />
      </ScrollView>
    </View>
  );
}