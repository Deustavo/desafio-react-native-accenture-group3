import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
    flex: 1;
    flex-flow: column;
`;

export const ContainerConfirmation = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ImageConfirmation = styled.Image`
    max-width: 162px;
    width: 100%;
`;

export const TextConfirmation = styled.Text`
    margin-top: 40px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
`;
