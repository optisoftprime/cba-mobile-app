// components/Dropdown.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-gray-900">{label}</Text>
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
        <Text
          className={value ? 'flex-1 text-base text-gray-900' : 'flex-1 text-base text-gray-400'}
          numberOfLines={1}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onToggle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onToggle}
          className="flex-1 justify-center bg-black/50 px-4">
          <TouchableOpacity activeOpacity={1} className="max-h-96 rounded-lg bg-white">
            <View className="border-b border-gray-200 px-4 py-4">
              <Text className="text-base font-semibold text-gray-900">{label}</Text>
            </View>
            <ScrollView className="max-h-120">
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    onSelect(option.value);
                    onToggle();
                  }}
                  className={`px-4 py-4 ${
                    index !== options.length - 1 ? 'border-b border-gray-200' : ''
                  } ${value === option.value ? 'bg-blue-50' : ''}`}>
                  <Text
                    className={`text-base ${
                      value === option.value ? 'font-semibold text-blue-600' : 'text-gray-900'
                    }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
