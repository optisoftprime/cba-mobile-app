// // components/walletBox.jsx
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// const WalletCard = ({ 
//   walletName = "RizeSpring Savings Wallet",
//   balance = "₦0.00",
//   description = "Across 7 savings plans",
//   onDescriptionPress,
//   backgroundImagePath = require('../assets/Vector .png'),
//   color = "#0F5ED5",
//   topRightText,
//   topRightAction,
//   topRightIcon = "account-balance-wallet",
//   topRightIconSize = 14,
// }) => {
//   const [isBalanceVisible, setIsBalanceVisible] = useState(true);

//   const toggleBalanceVisibility = () => {
//     setIsBalanceVisible(!isBalanceVisible);
//   };

//   const displayBalance = isBalanceVisible ? balance : '••••••';

//   return (
//     <View 
//       className="relative mx-5 mb-8 overflow-hidden rounded-2xl p-6"
//       style={{ backgroundColor: color }}
//     >
//       {/* Template Image */}
//       <Image
//         source={backgroundImagePath}
//         className="absolute bottom-0 right-0 opacity-30"
//         style={{ width: 150, height: 120 }}
//       />

//       {/* Top Right Button (Conditional) */}
//       {topRightText && topRightAction && (
//         <TouchableOpacity
//           onPress={topRightAction}
//           className="absolute right-4 top-4 flex-row items-center rounded-full bg-white px-3 py-2">
//           <MaterialIcons name={topRightIcon} size={topRightIconSize} color={color} />
//           <Text className="ml-1 text-xs font-semibold" style={{ color: color }}>
//             {topRightText}
//           </Text>
//         </TouchableOpacity>
//       )}

//       <View className="mb-4 flex-row items-center">
//         <Ionicons name="checkmark-circle" size={18} color="rgba(255,255,255,0.25)" />
//         <Text className="ml-2 text-sm font-medium text-white">{walletName}</Text>
//       </View>
      
//       <View className="mb-4 flex-row items-center justify-start gap-5">
//         <Text className="text-4xl font-bold text-white">{displayBalance}</Text>
//         <TouchableOpacity onPress={toggleBalanceVisibility}>
//           <Ionicons 
//             name={!isBalanceVisible ? "eye-off" : "eye"} 
//             size={24} 
//             color="white" 
//           />
//         </TouchableOpacity>
//       </View>
      
//       <TouchableOpacity 
//         className="self-start rounded-full bg-white px-4 py-2"
//         onPress={onDescriptionPress}>
//         <Text className="text-xs font-semibold text-gray-800">{description}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default WalletCard;