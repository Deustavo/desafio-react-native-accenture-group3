import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

interface TextHeaderProps {
    _mTop?: string
}

export const HeaderDashboard = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    width: ${Dimensions.get('window').width - 65}px;
    margin-bottom: 30px;
`;

export const TextHeaderDashboard = styled.Text`
    font-size: 26px;
    font-weight: 700;
    text-align: left;
    color: #fbfbfb;
`;

export const ContainerIcon = styled.View`
    flex-flow: row;
    width: 90px;
    justify-content: space-between;
`;

export const IconHeaderDashboard = styled(RectButton)`
    width: 100%;
    max-width: 33px;
`;

export const IconEye = styled(RectButton)`
    width: 100%;
    max-width: 40px;
    justify-content: center;
    align-items: center;
`;

export const ImgIconEye = styled.Image`
    width: 100%;
    max-width: 40px;
`;

export const ImgIconHeaderDashboard = styled.Image`
    width: 100%;
    max-width: 33px;
`;

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

export const TextHeaderCard = styled.Text<TextHeaderProps>`
    font-size: 18px;
    font-weight: 700;
    text-align: left;
    color: #9b9b9b;
    padding-left: 10px;
    margin-top: ${(props) => props._mTop || "0px"};
`;

export const ContentCard = styled.View`
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column;
`;

export const TextExpense = styled.Text`
    font-size: 15px;
    color: #9b9b9b;
    line-height: 18px;
    text-align: left;
    margin-top: 25px;
`;

export const PlanAccountContentCard = styled.View`
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column;
    border-bottom-color: #878686;
    border-bottom-width: 1px;
    padding-bottom: 25px;
`;

export const PlanAccountCard = styled.View`
    width: 100%;
    max-width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column;
`;

export const NoTransactions = styled.Text`
    margin: 15px 0;
    font-size: 16px;
    color: #9b9b9b;
    font-weight: bold;
`;
