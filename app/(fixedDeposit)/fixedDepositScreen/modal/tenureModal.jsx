// components/tenureModal.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TenureModal({ visible, onClose, tenure, setTenure, tenureOptions }) {
  const handleSelectTenure = (value) => {
    setTenure(value);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-end bg-black/50">
        <View className="rounded-t-2xl bg-white p-4">
          <Text className="mb-4 text-center text-lg font-semibold text-gray-900">
            You will Earn
          </Text>
          <FlatList
            data={tenureOptions}
            keyExtractor={(item) => item.value}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectTenure(item.value)}
                className="flex-row items-center justify-between border-b border-gray-200 py-4">
                <Text className="text-base text-gray-900">{item.label}</Text>
                {tenure === item.value && <Ionicons name="checkmark" size={20} color="#157196" />}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} className="items-center py-4">
            <Text className="text-base font-semibold text-blue-600">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}