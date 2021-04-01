import styled from "styled-components/native";

interface TextHistoricBalanceProps {
    _mTop?: string;
}

export const TextHistoric = styled.Text<TextHistoricBalanceProps>`
  font-size: 15px;
  color: #9B9B9B;
  line-height: 18px;
  text-align: left;
  margin-top: ${(props) => props._mTop || "15px"};
`