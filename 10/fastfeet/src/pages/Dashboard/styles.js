import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  display: flex;
  margin: 25px 15px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentHeader = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 32px;
  flex-direction: row;
  margin-right: 15px;
`;

export const Welcome = styled.View``;

export const Title = styled.Text`
  color: #666666;
  font-size: 12px;
`;

export const Name = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Logout = styled.View`
  justify-content: center;
`;

export const LogoutButton = styled(RectButton)`
  margin-right: 10px;
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const StatusButton = styled(RectButton)`
  margin-right: 10px;
`;

export const StatusText = styled.Text`
  margin-top: 7px;
  font-size: 12px;
  font-weight: bold;

  color: ${props => (props.active ? '#7D40E7' : '#999')};
  text-decoration: ${props => (props.active ? 'underline #7D40E7' : 'none')};
`;

export const DeliveriesList = styled.FlatList.attrs({})`
  padding: 15px;
`;
