import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { ContainerButton, TitleCard } from './styles';

interface ButtonPrimaryProps extends RectButtonProperties {
    title: string;
    iconName: string;
    iconSize: number;
    iconColor: string;
    marginTop?: string;
    marginBottom?: string;
    padding?: string;
    bgColor?: string;
    color?: string;
    _loading?: boolean;
    _width?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
    title,
    iconName,
    iconSize,
    iconColor,
    marginTop,
    marginBottom,
    padding,
    bgColor,
    color,
    _loading,
    _width,
    ...rest
}) => {
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

    const loop = Animated.loop(
        Animated.timing(shake, {
            useNativeDriver: true,
            duration: 1000,
            toValue: 3,
        })
    );

    useEffect(() => {
        if (_loading) {
            loop.start();
        } else {
            shake.setValue(0);
            loop.stop();
        }
    }, [_loading]);

    return (
        <Animated.View style={[animateStyle, { width: '100%' }]}>
            <ContainerButton
                _mTop={marginTop}
                _padding={padding}
                _mBottom={marginBottom}
                _bgColor={bgColor}
                _width={_width}
                {...rest}
            >
                <TitleCard _color={color}>{title}</TitleCard>
                <Feather name={iconName} size={iconSize} color={iconColor} />
            </ContainerButton>
        </Animated.View>
    );
};

export default ButtonPrimary;
