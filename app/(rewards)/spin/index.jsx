// screens/SavingsSpinner.jsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { navigateBack } from 'app/navigate';
import Header from 'components/header';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';
import Svg, { Path, Circle, G, Text as SvgText } from 'react-native-svg';

export default function SavingsSpinner() {
  const [isSpinning, setIsSpinning] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const prizes = [
    { label: '10 Points', color: '#DC2626' },
    { label: '50 Points', color: '#FEF3C7' },
    { label: '30 Points', color: '#DC2626' },
    { label: '5 Points', color: '#FEF3C7' },
    { label: '20 Points', color: '#DC2626' },
    { label: '100 Points', color: '#FEF3C7' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    
    // Random spins between 5-10 full rotations plus random segment
    const randomDegree = Math.floor(Math.random() * 360);
    const fullRotations = 5 + Math.floor(Math.random() * 5);
    const totalDegrees = fullRotations * 360 + randomDegree;

    Animated.timing(rotateAnim, {
      toValue: totalDegrees,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      // Determine which prize was won based on final position
      const segmentAngle = 360 / prizes.length;
      const normalizedDegree = randomDegree % 360;
      const wonIndex = Math.floor((360 - normalizedDegree) / segmentAngle) % prizes.length;
      console.log('Won:', prizes[wonIndex].label);
    });
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-white">
      <Header title="Savings Spinner" onLeftPress={navigateBack} showLeftIcon={true} color="black" />

      <View className="flex-1 items-center px-6 pt-4">
        {/* Subtitle */}
        <Text className="mb-8 text-center text-sm text-gray-500">Spin daily to win points</Text>

        {/* Spinner Wheel */}
        <View className="mb-12 items-center justify-center">
          {/* Arrow Pointer */}
          <View className="absolute -top-8 z-10">
            <Ionicons name="caret-down" size={40} color="#DC2626" />
          </View>

          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Svg width="280" height="280" viewBox="0 0 280 280">
              {/* Outer golden ring */}
              <Circle cx="140" cy="140" r="138" fill="#F59E0B" />
              <Circle cx="140" cy="140" r="130" fill="white" />

              {/* Wheel segments */}
              <G rotation="0" origin="140, 140">
                {prizes.map((prize, index) => {
                  const angle = (360 / prizes.length) * index;
                  const nextAngle = (360 / prizes.length) * (index + 1);
                  const startAngle = (angle - 90) * (Math.PI / 180);
                  const endAngle = (nextAngle - 90) * (Math.PI / 180);
                  
                  const x1 = 140 + 130 * Math.cos(startAngle);
                  const y1 = 140 + 130 * Math.sin(startAngle);
                  const x2 = 140 + 130 * Math.cos(endAngle);
                  const y2 = 140 + 130 * Math.sin(endAngle);

                  const pathData = `M 140 140 L ${x1} ${y1} A 130 130 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <G key={index}>
                      <Path d={pathData} fill={prize.color} />
                      <SvgText
                        x={140 + 80 * Math.cos((angle + 30 - 90) * (Math.PI / 180))}
                        y={140 + 80 * Math.sin((angle + 30 - 90) * (Math.PI / 180))}
                        fill={prize.color === '#DC2626' ? 'white' : '#DC2626'}
                        fontSize="14"
                        fontWeight="600"
                        textAnchor="middle"
                        transform={`rotate(${angle + 30}, ${140 + 80 * Math.cos((angle + 30 - 90) * (Math.PI / 180))}, ${140 + 80 * Math.sin((angle + 30 - 90) * (Math.PI / 180))})`}>
                        {prize.label}
                      </SvgText>
                    </G>
                  );
                })}
              </G>

              {/* Center circle */}
              <Circle cx="140" cy="140" r="20" fill="white" />
              <Circle cx="140" cy="140" r="15" fill="#F59E0B" />
            </Svg>
          </Animated.View>
        </View>

        {/* Spin Button */}
        <TouchableOpacity
          onPress={handleSpin}
          disabled={isSpinning}
          className="w-full rounded-xl py-4"
          style={{ backgroundColor: Colors.primary, opacity: isSpinning ? 0.6 : 1 }}
          activeOpacity={0.8}>
          <Text className="text-center text-base font-semibold text-white">
            {isSpinning ? 'Spinning...' : 'Spin The Wheel'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}