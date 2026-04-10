// components/Dropdown.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const defaultTriggerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 16,
  paddingVertical: 12,
};

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
  triggerStyle = {},
  triggerTextStyle = {},
  triggerIconColor,
  triggerIconSize = 20,
  // when true, the built-in trigger button is not rendered at all.
  // use this when you want to drive the modal from your own button.
  hideTrigger = false,
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

  const chevronColor = triggerIconColor ?? (isLoading ? '#D1D5DB' : '#9CA3AF');

  return (
    <View>
      {!!label && !hideTrigger && (
        <Text
          style={{
            marginBottom: 8,
            fontSize: 14,
            fontWeight: '600',
            color: isLoading ? '#9CA3AF' : '#111827',
          }}>
          {label}
        </Text>
      )}

      {!hideTrigger && (
        <TouchableOpacity
          onPress={isLoading ? undefined : onToggle}
          activeOpacity={isLoading ? 1 : 0.8}
          style={[
            defaultTriggerStyle,
            triggerStyle,
            isLoading && { backgroundColor: '#F3F4F6', opacity: 0.7 },
          ]}>
          <Text
            numberOfLines={1}
            style={[
              { flex: 1, fontSize: 16, color: value && !isLoading ? '#111827' : '#9CA3AF' },
              triggerTextStyle,
            ]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Ionicons
            name="chevron-down"
            size={triggerIconSize}
            color={chevronColor}
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      )}

      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onToggle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onToggle}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              maxHeight: 400,
              overflow: 'hidden',
              borderRadius: 12,
              backgroundColor: '#fff',
            }}>
            {!!label && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#E5E7EB',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#111827' }}>{label}</Text>
              </View>
            )}

            {search && (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#F3F4F6',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#D1D5DB',
                    borderRadius: 8,
                    backgroundColor: '#F9FAFB',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}>
                  <Ionicons name="search" size={16} color="#9CA3AF" />
                  <TextInput
                    style={{ marginLeft: 8, flex: 1, fontSize: 14, color: '#111827' }}
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

            <ScrollView keyboardShouldPersistTaps="handled">
              {filteredOptions.length === 0 ? (
                <View style={{ alignItems: 'center', paddingHorizontal: 16, paddingVertical: 24 }}>
                  <Text style={{ fontSize: 14, color: '#9CA3AF' }}>No results found</Text>
                </View>
              ) : (
                filteredOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onSelect(option.value);
                      onToggle();
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      borderBottomWidth: index !== filteredOptions.length - 1 ? 1 : 0,
                      borderBottomColor: '#F3F4F6',
                      backgroundColor: value === option.value ? '#EFF6FF' : '#FFFFFF',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: value === option.value ? '#2563EB' : '#111827',
                        fontWeight: value === option.value ? '600' : '400',
                      }}>
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
