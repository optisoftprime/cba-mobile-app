// components/customDropDown.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomSelectDropdown = ({
  label,
  placeholder = "Select an option",
  value,
  options = [],
  onSelect,
  error,
  disabled = false,
  containerClassName = "",
  labelClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = options.find(opt => opt.value === value);

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item.value);
    }
    setIsOpen(false);
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <Text className={`mb-2 text-sm font-semibold text-gray-900 ${labelClassName}`}>
          {label}
        </Text>
      )}

      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`
          flex-row items-center rounded-lg border px-4 py-3
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100' : 'bg-white'}
        `}
        style={{ height: 52 }}
      >
        <Text
          className={`flex-1 text-base ${selectedItem ? 'text-gray-900' : 'text-gray-400'}`}
          numberOfLines={1}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Error Message */}
      {error && (
        <Text className="mt-1 text-sm text-red-600">
          {error}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="flex-1 justify-center px-5">
            <View className="bg-white rounded-lg max-h-96">
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    className={`
                      px-4 py-3 border-b border-gray-100
                      ${value === item.value ? 'bg-blue-50' : 'bg-white'}
                    `}
                  >
                    <Text className="text-base text-gray-900">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                  <View className="px-4 py-3 items-center">
                    <Text className="text-gray-400">No options available</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomSelectDropdown;