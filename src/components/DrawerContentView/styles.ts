import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const DrawerContent = styled.View`
  flex: 1;
  padding: 0 20px;
  z-index: 4;
`;

export const HeaderDrawer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 17px;
  padding-bottom: 40px;
`;

export const ButtonUserHeader = styled(RectButton)`
  width: 100%;
  max-width: 33px;
  justify-content: center;
  align-items: center;
`;

export const ButtonCloseHeader = styled(RectButton)`
  width: 100%;
  max-width: 33px;
  justify-content: center;
  align-items: center;
`;

export const ImageUser = styled.Image`
  width: 100%;
  max-width: 33px;
`;

export const ImageClose = styled.Image`
  width: 100%;
  max-width: 25px;
`;
