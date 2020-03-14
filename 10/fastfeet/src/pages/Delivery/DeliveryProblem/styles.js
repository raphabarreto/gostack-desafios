import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;

export const Background = styled.View`
  background-color: #7d40e7;
  height: 155px;
`;

export const DeliveryContainer = styled.View`
  margin-top: -55px;
`;

export const Form = styled.View`
  align-self: center;
  width: 335px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  height: 300px;
`;

export const SubmitButton = styled(Button)`
  background-color: #7d40e7;
  align-self: center;
  width: 335px;
`;
