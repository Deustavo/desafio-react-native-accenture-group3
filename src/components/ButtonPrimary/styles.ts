import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ButtonProps {
    _color?: string;
    _bgColor?: string;
    _fSize?: string;
    _padding?: string;
    _mTop?: string;
    _mBottom?: string;
    _loading?: boolean;
    _width?: string;
}

export const ContainerButton = styled(RectButton)<ButtonProps>`
    width: ${(props) => (props._width ? props._width : '100%')};
    border-radius: 15px;
    background-color: ${(props) => props._bgColor || '#63dc3f'};
    margin: 0 auto;
    margin-top: ${(props) => props._mTop || '20px'};
    margin-bottom: ${(props) => props._mBottom || '0'};
    padding: ${(props) => props._padding || '10px 20px'};
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
`;

export const TitleCard = styled.Text<ButtonProps>`
    color: ${(props) => props._color || '#FFFFFF'};
    font-size: ${(props) => props._fSize || '16px'};
`;
