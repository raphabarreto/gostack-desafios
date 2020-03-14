import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Background = styled.View`
  background-color: #7d40e7;
  height: 155px;
`;

export const DeliveryName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-top: -70px;
  color: #ffffff;
`;

export const DeliveryContainer = styled.View`
  margin-top: -55px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 13px 13px;
  width: auto;
`;

export const Problem = styled.View`
  background: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  flex-direction: column;
  justify-content: space-between;
  border: 0.5px;
  border-color: rgba(158, 150, 150, 0.5);
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const Created = styled.Text`
  margin-top: 10px;
  color: #c1c1c1;
`;
