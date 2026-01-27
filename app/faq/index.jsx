// screens/FAQ.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'How do I download a RizeSpring Mobile App',
      answer: 'Lorem ipsum dolor sit amet consectetur. Odio mi augue vulputate potenti. Ante tincidunt sit adipiscing pellentesque. Nunc nisi arcu pretium nunc. Convallis.',
    },
    {
      id: 2,
      question: 'How do I verify my identity?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Tempus nec sit non iaculis dolor porttitor aliquet sed. Euismod mauris dolor lorem pellentesque urna. Et dolor ac integer ullamcorper ut adipiscing.',
    },
    {
      id: 3,
      question: 'How do I fund my wallet?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Odio mi augue vulputate potenti. Ante tincidunt sit adipiscing pellentesque. Nunc nisi arcu pretium nunc.',
    },
    {
      id: 4,
      question: 'Can I transfer money to other bank accounts?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Tempus nec sit non iaculis dolor porttitor aliquet sed. Euismod mauris dolor lorem pellentesque urna.',
    },
    {
      id: 5,
      question: 'Are there limits to how much I can transfer?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Odio mi augue vulputate potenti. Ante tincidunt sit adipiscing pellentesque.',
    },
    {
      id: 6,
      question: 'How do I apply for a loan?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Tempus nec sit non iaculis dolor porttitor aliquet sed. Euismod mauris dolor lorem pellentesque urna. Et dolor ac integer ullamcorper ut adipiscing.',
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Frequently Asked Questions"
        onLeftPress={navigateBack}
        showLeftIcon={true}
        color="black"
      />

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingTop: 8, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}>
        
        {faqData.map((item, index) => (
          <View key={item.id} className="mb-3">
            {/* Question */}
            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              className="flex-row items-center justify-between rounded-lg bg-white px-4 py-4"
              activeOpacity={0.7}>
              <Text className="flex-1 pr-3 text-sm font-medium text-gray-900">
                {item.question}
              </Text>
              <Ionicons 
                name={expandedId === item.id ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#374151" 
              />
            </TouchableOpacity>

            {/* Answer */}
            {expandedId === item.id && (
              <View className="mt-2 rounded-lg bg-white px-4 py-4">
                <Text className="text-sm leading-5 text-gray-600">
                  {item.answer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}