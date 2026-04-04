// screens/SecurityQuestions.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Alert, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from 'components/header';
import { navigateBack, navigateTo } from 'app/navigate';
import TouchBtn from 'components/touchBtn';
import { setSecurityQuestions } from 'api/auth';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { save } from 'config/storage';
import { GlobalStatusBar } from 'config/statusBar';
import { Colors } from 'config/theme';
import Toast from 'react-native-toast-message';
import TextInputComponent from 'components/textInputs';

export default function SecurityQuestions() {
  const [question1, setQuestion1] = useState('');
  const [answer1, setAnswer1] = useState('');

  const [question2, setQuestion2] = useState('');
  const [answer2, setAnswer2] = useState('');

  const [question3, setQuestion3] = useState('');
  const [answer3, setAnswer3] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const params = useLocalSearchParams();

  const isFormReady =
    question1.trim() &&
    answer1.trim() &&
    question2.trim() &&
    answer2.trim() &&
    question3.trim() &&
    answer3.trim();

  useEffect(() => {
    save('appState', {
      stage: 'securityQuestion',
      params: {
        accountNumber: params?.accountNumber,
        username: params?.username,
      },
    });
  }, []);

  const handleCancelConfirm = () => {
    Alert.alert(
      'Leave this page?',
      'Are you sure you want to go back? You will need to start this step over.',
      [
        { text: 'No, Stay', style: 'cancel' },
        {
          text: 'Yes, Leave',
          style: 'destructive',
          onPress: () => {
            save('appState', null);
            navigateBack();
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        handleCancelConfirm();
        return true;
      });
      return () => backHandler.remove();
    }, [])
  );

  const handleContinue = async () => {
    const selected = [question1.trim(), question2.trim(), question3.trim()];
    if (new Set(selected).size !== 3) {
      Toast.show({
        type: 'error',
        text1: 'Duplicate Questions',
        text2: 'Please enter 3 different questions',
      });
      return;
    }

    setIsLoading(true);

    const response = await setSecurityQuestions(params?.username, {
      questions: [
        { question: question1.trim(), answer: answer1.trim() },
        { question: question2.trim(), answer: answer2.trim() },
        { question: question3.trim(), answer: answer3.trim() },
      ],
    });

    console.log(JSON.stringify(response, null, 2));

    if (response?.ok) {
      Toast.show({
        type: 'success',
        text1: 'Saved!',
        text2: 'Security questions set successfully',
      });
      save('appState', null);
      navigateTo('setTransactionPin', {
        accountNumber: params?.accountNumber,
        username: params?.username,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: response?.message || 'Something went wrong',
      });
    }

    setIsLoading(false);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
      <GlobalStatusBar style="dark-content" />
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={150}
        extraHeight={150}>
        <Header
          title="Secure your Access"
          onLeftPress={handleCancelConfirm}
          showLeftIcon={true}
          subtitle="Set your security questions to protect your profile"
        />

        <View className="flex-1 px-5 pt-2">
          <TextInputComponent
            label="Security Question 1"
            value={question1}
            onChangeText={setQuestion1}
            placeholder="Enter your security question"
            isLoading={isLoading}
          />
          <TextInputComponent
            label="Answer 1"
            value={answer1}
            onChangeText={setAnswer1}
            placeholder="Enter your answer"
            isLoading={isLoading}
          />

          <TextInputComponent
            label="Security Question 2"
            value={question2}
            onChangeText={setQuestion2}
            placeholder="Enter your security question"
            isLoading={isLoading}
          />
          <TextInputComponent
            label="Answer 2"
            value={answer2}
            onChangeText={setAnswer2}
            placeholder="Enter your answer"
            isLoading={isLoading}
          />

          <TextInputComponent
            label="Security Question 3"
            value={question3}
            onChangeText={setQuestion3}
            placeholder="Enter your security question"
            isLoading={isLoading}
          />
          <TextInputComponent
            label="Answer 3"
            value={answer3}
            onChangeText={setAnswer3}
            placeholder="Enter your answer"
            isLoading={isLoading}
          />
        </View>

        <View className="px-5 pb-6 pt-4">
          <TouchBtn
            onPress={handleContinue}
            isLoading={isLoading}
            loadingText="Please wait..."
            disabled={!isFormReady}
            label="Continue"
            textClassName="text-base font-semibold"
            buttonClassName="items-center rounded-lg py-4"
            activeOpacity={0.8}
            containerClassName=""
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
