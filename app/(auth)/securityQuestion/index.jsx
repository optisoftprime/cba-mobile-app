// screens/SecurityQuestions.jsx
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, TextInput } from 'react-native';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import Dropdown from 'components/dropDown';
import TouchBtn from 'components/touchBtn';
import { getSecurityQuestions } from 'api/auth';
import { useLocalSearchParams } from 'expo-router';
import { save } from 'config/storage';
import { GlobalStatusBar } from 'config/statusBar';

const securityQuestions = [
  { label: 'What is your favourite food?', value: 'favourite_food' },
  { label: 'What is your first car?', value: 'first_car' },
  { label: 'What is your dream vacation city?', value: 'dream_city' },
  { label: 'What was the name of your first school?', value: 'first_school' },
  { label: "What is your mother's maiden name?", value: 'mother_maiden_name' },
  { label: "What is your pet's name?", value: 'pet_name' },
  { label: 'What city were you born in?', value: 'birth_city' },
  { label: 'What is your favorite book?', value: 'favorite_book' },
];

export default function SecurityQuestions() {
  const [question1, setQuestion1] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [showDropdown1, setShowDropdown1] = useState(false);
  // also remeber to add the alert are you sure you want to quit youll have to start all over like the over  screens
  // alo to clear the asyn for this saved scren at the right place

  const [question2, setQuestion2] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showDropdown2, setShowDropdown2] = useState(false);

  const [question3, setQuestion3] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [showDropdown3, setShowDropdown3] = useState(false);

  const params = useLocalSearchParams();

  const handleContinue = () => {
    navigateTo('setTransactionPin');
  };

  useEffect(() => {
    save('appState', {
      stage: 'securityQuestion',
      params: {
        accountNumber: params?.accountNumber,
        username: params?.username,
      },
    });
  }, []);

  //   setInterval(()=>{
  // console.log(params)
  // {"accountNumber": "4179345591", "username": "isrealgab3"}
  //   },2500)

  async function fetchQuestions() {
    const response = await getSecurityQuestions({ username: params?.username });
    console.log('Security Questions Response:', JSON.stringify(response, null, 2));
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <GlobalStatusBar style="dark-content" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Secure your Access"
          onLeftPress={navigateBack}
          showLeftIcon={true}
          subtitle="Set your security questions to protect your profile"
        />

        <View className="flex-1 px-5 pt-2">
          <Dropdown
            label="Security Question 1"
            placeholder="Security Question 1"
            value={question1}
            options={securityQuestions}
            onSelect={(value) => {
              setQuestion1(value);
              setShowDropdown1(false);
            }}
            isOpen={showDropdown1}
            onToggle={() => setShowDropdown1(!showDropdown1)}
          />

          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Answer</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={answer1}
              onChangeText={setAnswer1}
              placeholder="Answers"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <Dropdown
            label="Security Question 2"
            placeholder="Security Question 2"
            value={question2}
            options={securityQuestions}
            onSelect={(value) => {
              setQuestion2(value);
              setShowDropdown2(false);
            }}
            isOpen={showDropdown2}
            onToggle={() => setShowDropdown2(!showDropdown2)}
          />

          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Answer</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={answer2}
              onChangeText={setAnswer2}
              placeholder="Answers"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <Dropdown
            label="Security Question 3"
            placeholder="Security Question 3"
            value={question3}
            options={securityQuestions}
            onSelect={(value) => {
              setQuestion3(value);
              setShowDropdown3(false);
            }}
            isOpen={showDropdown3}
            onToggle={() => setShowDropdown3(!showDropdown3)}
          />

          <View className="mb-4">
            <Text className="mb-2 text-sm font-semibold text-gray-900">Answer</Text>
            <TextInput
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900"
              value={answer3}
              onChangeText={setAnswer3}
              placeholder="Answers"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            label="Continue"
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
