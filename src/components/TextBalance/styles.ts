import styled from 'styled-components/native';

interface TextBalanceProps {
    _Color?: string;
    _mTop?: string;
}

export const TextBalanceComponent = styled.Text<TextBalanceProps>`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    color: ${(props) => props._Color || '#474898'};
    margin-top: ${(props) => props._mTop || '15px'};
`;
