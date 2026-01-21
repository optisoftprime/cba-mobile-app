// components/Dropdown.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <View className="relative mb-4">
      <Text className="mb-2 text-sm font-semibold text-gray-900">{label}</Text>
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center rounded-lg border border-gray-300 bg-white px-4 py-3">
        <Text className={value ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color="#9CA3AF"
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-300 bg-white shadow-lg">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(option.value)}
              className={`px-4 py-3 ${index !== options.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <Text className="text-base text-gray-900">{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}