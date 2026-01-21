// components/DropdownInput.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DropdownInput({
  label = 'Label',
  placeholder = 'Select an option',
  selectedOption = '',
  answer = '',
  showDropdown = false,
  options = [],
  onToggleDropdown = () => {},
  onSelectOption = () => {},
  onAnswerChange = () => {},
  answerPlaceholder = 'Enter answer',
  showAnswerInput = true,
}) {
  return (
    <View className="mb-6">
      {/* Label */}
      <Text className="text-sm font-semibold text-gray-900 mb-2">
        {label}
      </Text>
      
      {/* Dropdown Selector */}
      <TouchableOpacity
        onPress={onToggleDropdown}
        className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
        style={{ borderColor: '#D1D5DB' }}
        activeOpacity={0.7}>
        <Text className={selectedOption ? 'text-gray-900 text-base' : 'text-gray-400 text-base'}>
          {selectedOption || placeholder}
        </Text>
        <Ionicons 
          name={showDropdown ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#666" 
        />
      </TouchableOpacity>

      {/* Dropdown List */}
      {showDropdown && (
        <View 
          className="border border-gray-300 rounded-lg mt-2 bg-white"
          style={{ 
            borderColor: '#D1D5DB',
            maxHeight: 200,
          }}>
          <ScrollView 
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelectOption(option)}
                className="px-4 py-3 border-b border-gray-200"
                activeOpacity={0.7}>
                <Text className="text-gray-900 text-sm">
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Answer Input (Optional) */}
      {showAnswerInput && (
        <TextInput
          value={answer}
          onChangeText={onAnswerChange}
          placeholder={answerPlaceholder}
          placeholderTextColor="#9CA3AF"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 mt-3"
          style={{ 
            borderColor: '#D1D5DB',
            fontSize: 16,
          }}
        />
      )}
    </View>
  );
}