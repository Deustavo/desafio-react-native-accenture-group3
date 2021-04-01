import { Form } from '@unform/mobile';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const HeaderCard = styled.View`
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row;
`;

export const IconHeaderCard = styled.Image`
    width: 100%;
    max-width: 24px;
`;

export const TextHeaderCard = styled.Text`
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    color: #9b9b9b;
    padding-left: 10px;
`;

export const HeaderDashboard = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    width: ${Dimensions.get('window').width}px;
    padding: 35px;
`;

export const TextHeaderDashboard = styled.Text`
    font-size: 26px;
    font-weight: 700;
    text-align: left;
    color: #8c52e5;
`;

export const CloseButton = styled(RectButton)`
    width: 100%;
    max-width: 33px;
`;

export const DepositForm = styled(Form)`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

export const DateError = styled.Text`
    margin-top: -20px;
    color: #e6505c;
`;
