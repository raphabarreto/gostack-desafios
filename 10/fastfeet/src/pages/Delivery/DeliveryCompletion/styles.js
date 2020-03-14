import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Background = styled.View`
  background-color: #7d40e7;
  height: 155px;
`;

export const DeliveryContainer = styled.View`
  margin-top: -55px;
`;

export const ViewPhoto = styled.View`
  width: 335px;
  height: 450px;
  position: absolute;
  margin-top: -55px;
  align-self: center;
`;

export const View = styled.View`
  margin-bottom: 320px;
`;

export const CaptureButton = styled(RectButton)`
  background: #9f9f9f;
  padding: 20px;
  border-radius: 45px;
  align-self: center;
  margin: 30px;
`;

export const SendButton = styled(Button)`
  padding: 10px;
  background: #7d40e7;
  margin: 0 20px;
  border-radius: 4px;
  width: 335px;
  align-self: center;
`;
