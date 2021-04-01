import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface InterfaceContainerCard {
    _Padding?: string;
    _MarginBottom?: string;
    _MarginTop?: string;
}

export const ContainerCard = styled.View<InterfaceContainerCard>`
    width: ${Dimensions.get('window').width - 60}px;
    background: #ffffff;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    padding: ${(props) => props._Padding || '40px;'};
    margin-bottom: ${(props) => props._MarginBottom || '0px;'};
    margin-top: ${(props) => props._MarginTop || '0px'};
`;
