import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  margin-bottom: 30px;
  border-radius: 5px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
`;

export const DetailsContainer = styled.View`
  flex-direction: row;
  padding: 15px 15px;
  margin-top: 10px;
  background-color: #f1f3ff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  align-items: center;
`;

export const Detail = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0 5px;
`;

export const Subtitle = styled.Text`
  color: #999999;
  font-size: 8px;
  font-weight: bold;
`;

export const DetailInfo = styled.Text`
  color: #444444;
  font-size: 12px;
  font-weight: bold;
`;

export const LinkStyled = styled.Text`
  margin-top: 10px;
  color: #7d40e7;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export const ProgressContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  background-color: #7d40e7;
  height: 2px;
  margin: 15px 22px;
`;

export const StatusDot = styled.View`
  margin-top: -3.5px;
  width: 9px;
  height: 9px;
  background-color: ${props => (props.active ? '#7D40E7' : '#fff')};
  border: 1px solid #7d40e7;
  border-radius: 5px;
`;

export const ProgressName = styled.View`
  flex-direction: row;
  margin-top: 5px;
  justify-content: space-between;
  margin: 7px 10px 10px;
`;

export const StatusName = styled.Text`
  width: 50px;
  text-align: center;
  color: #999999;
  font-size: 8px;
`;

export const DeliveryLink = styled.TouchableOpacity``;
