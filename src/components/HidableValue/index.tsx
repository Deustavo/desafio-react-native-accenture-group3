import React from 'react';
//
import * as S from './styles';
import { Dimensions } from 'react-native';

interface HidableValueProps {
    condition: boolean;
    value?: any;
}

const HidableValue: React.FC<HidableValueProps> = ({ condition, value }) => {
    return condition ? (
        <S.HideContainer
            colors={['rgba(0,0,10,0.2)', 'rgba(0,0,10,0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: Dimensions.get('window').width - 100 }}
        />
    ) : (
        value
    );
};

export default HidableValue;
