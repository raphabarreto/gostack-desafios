import styled from 'styled-components/native';

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

export const DeliveryInfo = styled.View`
  background-color: #fff;
  border-radius: 2px;
  padding: 8px;
  margin: 0px 30px 15px;
  border: 0.5px;
  border-color: rgba(158, 150, 150, 0.5);
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const HeaderText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const Title = styled.Text`
  color: #999999;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const Info = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Status = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ActionsContainer = styled.View`
  margin: 0px 30px;
  background-color: #f8f9fd;
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  flex-direction: row;
`;

export const Action = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: 1px solid #0000001a;
`;

export const ActionText = styled.Text`
  margin-top: 2px;
  color: #999999;
  font-size: 12px;
  text-align: center;
`;
