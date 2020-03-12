import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  margin: 30px;
`;

export const Avatar = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  align-self: center;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Info = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
`;
