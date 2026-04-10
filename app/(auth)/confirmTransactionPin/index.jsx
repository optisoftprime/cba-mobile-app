// // screens/ConfirmTransactionPIN.jsx
// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { View, Text, TextInput, Image, ScrollView, Alert, BackHandler } from 'react-native';
// import Header from 'components/header';
// import { navigateBack, navigateReplace, navigateTo } from 'app/navigate';
// import TouchBtn from 'components/touchBtn';
// import { Colors } from 'config/theme';
// import { GlobalStatusBar } from 'config/statusBar';
// import { useLocalSearchParams } from 'expo-router';
// import { useFocusEffect } from 'expo-router';
// import { save } from 'config/storage';
// import { setupTransactionPin } from 'api/auth';
// import Toast from 'react-native-toast-message';

// export default function ConfirmTransactionPIN() {
//   const [pin, setPin] = useState(['', '', '', '']);
//   const [isLoading, setIsLoading] = useState(false);
//   const inputRefs = useRef([]);
//   const params = useLocalSearchParams();

//   useEffect(() => {
//     save('appState', {
//       stage: 'confirmTransactionPin',
//       params: {
//         accountNumber: params?.accountNumber,
//         username: params?.username,
//         pin: params?.pin,
//       },
//     });
//   }, []);

//   // update useFocusEffect
//   useFocusEffect(
//     useCallback(() => {
//       const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//         handleBack();
//         return true;
//       });
//       return () => backHandler.remove();
//     }, [])
//   );

//   const handlePinChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;
//     const newPin = [...pin];
//     newPin[index] = value;
//     setPin(newPin);
//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace') {
//       if (pin[index]) {
//         const newPin = [...pin];
//         newPin[index] = '';
//         setPin(newPin);
//       } else if (index > 0) {
//         const newPin = [...pin];
//         newPin[index - 1] = '';
//         setPin(newPin);
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleContinue = async () => {
//     const confirmedPin = pin.join('');

//     if (confirmedPin !== params?.pin) {
//       Toast.show({
//         type: 'error',
//         text1: 'PIN Mismatch',
//         text2: 'PINs do not match, please try again',
//       });
//       setPin(['', '', '', '']);
//       inputRefs.current[0]?.focus();
//       return;
//     }

//     setIsLoading(true);

//     const response = await setupTransactionPin(params?.username, { pin: confirmedPin });

//     console.log(JSON.stringify(response, null, 2));

//     if (response?.ok) {
//       Toast.show({ type: 'success', text1: 'PIN Set!', text2: 'Transaction PIN set successfully' });
//       save('appState', null);
//       navigateReplace('successScreen', {
//         message: 'Your account is now secured and ready for use',
//         nextScreen: 'landingScreen',
//         backScreen: 'landingScreen',
//       });
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'Failed',
//         text2: response?.message || 'Something went wrong',
//       });
//       setPin(['', '', '', '']);
//       inputRefs.current[0]?.focus();
//     }

//     setIsLoading(false);
//   };

//   const handleBack = () => {
//     save('appState', {
//       stage: 'setTransactionPin',
//       params: {
//         accountNumber: params?.accountNumber,
//         username: params?.username,
//       },
//     });
//     navigateBack();
//   };

//   return (
//     <View className="flex-1" style={{ backgroundColor: Colors?.background }}>
//       <GlobalStatusBar style="dark-content" />
//       <ScrollView
//         className="flex-1"
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}>
//         <Header title="Confirm Transaction PIN" onLeftPress={handleBack} showLeftIcon={true} />

//         <View className="mb-6 items-center px-5">
//           <Image
//             source={require('../../../assets/cuate.png')}
//             style={{ width: 250, height: 250 }}
//             resizeMode="contain"
//           />
//         </View>

//         <View className="mb-8 px-5">
//           <Text className="text-center text-sm leading-5 text-gray-600">
//             Re-enter your PIN to confirm
//           </Text>
//         </View>

//         <View className="mb-8 flex-row justify-center px-5">
//           {pin.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={(ref) => (inputRefs.current[index] = ref)}
//               value={digit}
//               onChangeText={(value) => handlePinChange(value, index)}
//               onKeyPress={(e) => handleKeyPress(e, index)}
//               keyboardType="numeric"
//               maxLength={1}
//               caretHidden={true}
//               secureTextEntry={true}
//               editable={!isLoading}
//               className="mx-2 rounded-lg text-center text-2xl font-bold"
//               style={{
//                 width: 60,
//                 height: 60,
//                 backgroundColor: digit ? Colors?.primary : 'white',
//                 color: digit ? 'white' : Colors?.primary,
//                 borderWidth: 2,
//                 borderColor: Colors?.primary,
//               }}
//             />
//           ))}
//         </View>

//         <View className="mt-auto px-5 pb-6 pt-4">
//           <TouchBtn
//             onPress={handleContinue}
//             isLoading={isLoading}
//             loadingText="Please wait..."
//             disabled={pin.join('').length !== 4}
//             label="Continue"
//             textClassName="text-base font-semibold"
//             buttonClassName="items-center rounded-lg py-4"
//             activeOpacity={0.8}
//             containerClassName=""
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
