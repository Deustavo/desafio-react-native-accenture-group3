import React, { useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';
//
import * as S from './styles';

interface MoneyLoaderProps {
    size?: number;
    color?: string;
}

const MoneyLoader: React.FC<MoneyLoaderProps> = ({ size, color }) => {
    const shake = useRef(new Animated.Value(0)).current;

    const interpolated = shake.interpolate({
        inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    const animateStyle = {
        transform: [
            {
                translateX: interpolated,
            },
        ],
    };

    Animated.loop(
        Animated.timing(shake, {
            useNativeDriver: true,
            duration: 500,
            toValue: 3,
        })
    ).start();

    return (
        <S.Container>
            <Animated.View style={animateStyle}>
                <MaterialCommunityIcons
                    name="currency-usd-circle-outline"
                    size={100}
                    color="white"
                />
            </Animated.View>
        </S.Container>
    );
};

export default MoneyLoader;
