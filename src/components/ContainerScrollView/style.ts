import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';

interface ContainerScrollViewProps {
    _bgColor?: string;
}

export const ContainerScrollView = styled(ScrollView)<ContainerScrollViewProps>`
    width: ${Dimensions.get('window').width}px;
    height: ${Dimensions.get('window').height}px;
    background-color: ${props => props._bgColor || "#a100ff"};
`;
