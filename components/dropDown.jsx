// components/Dropdown.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Dropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
  search = false,
  isLoading = false,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isOpen) setSearchQuery('');
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions =
    search && searchQuery.trim()
      ? options.filter((o) => o.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

  return (
    <View className="mb-4">
      <Text
        className="mb-2 text-sm font-semibold"
        style={{ color: isLoading ? '#9CA3AF' : '#111827' }}>
        {label}
      </Text>

      <TouchableOpacity
        onPress={isLoading ? undefined : onToggle}
        activeOpacity={isLoading ? 1 : 0.8}
        className="flex-row items-center rounded-lg border px-4 py-3"
        style={{
          borderColor: '#D1D5DB',
          backgroundColor: isLoading ? '#F3F4F6' : '#FFFFFF',
          opacity: isLoading ? 0.7 : 1,
        }}>
        <Text
          className="flex-1 text-base"
          style={{ color: value && !isLoading ? '#111827' : '#9CA3AF' }}
          numberOfLines={1}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={isLoading ? '#D1D5DB' : '#9CA3AF'}
          style={{ marginLeft: 8 }}
        />
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

            {search && (
              <View className="border-b border-gray-100 px-4 py-1">
                <View className="flex-row items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1">
                  <Ionicons name="search" size={16} color="#9CA3AF" />
                  <TextInput
                    className="ml-2 flex-1 text-sm text-gray-900"
                    placeholder="Search..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                    returnKeyType="search"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}

            <ScrollView className="max-h-120" keyboardShouldPersistTaps="handled">
              {filteredOptions.length === 0 ? (
                <View className="items-center px-4 py-6">
                  <Text className="text-sm text-gray-400">No results found</Text>
                </View>
              ) : (
                filteredOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onSelect(option.value);
                      onToggle();
                    }}
                    className={`px-4 py-4 ${
                      index !== filteredOptions.length - 1 ? 'border-b border-gray-200' : ''
                    } ${value === option.value ? 'bg-blue-50' : ''}`}>
                    <Text
                      className={`text-base ${
                        value === option.value ? 'font-semibold text-blue-600' : 'text-gray-900'
                      }`}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
