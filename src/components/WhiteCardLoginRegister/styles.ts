import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface InterfaceContainerCard {
    pdHorizontal?: string;
}

export const ContainerCard = styled.View<InterfaceContainerCard>`
    width: ${Dimensions.get('window').width - 60}px;
    background: #ffffff;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props.pdHorizontal || '40px;'};
`;

export const TitleCard = styled.Text`
    color: #000000;
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
`;
