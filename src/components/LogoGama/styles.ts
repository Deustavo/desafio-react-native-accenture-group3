import styled from "styled-components/native";
import {Dimensions} from "react-native";

interface LogoProps {
    _mTop?: string;
    _mBottom?: string;
}

export const ContainerLogo = styled.View<LogoProps>`
  width: ${Dimensions.get("window").width}px;
  margin-top: ${(props) => props._mTop || "0px"};
  margin-bottom: ${(props) => props._mBottom || "0px"};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LogoGama = styled.Image`
  width: 100%;
  max-width: 249px;
`;
