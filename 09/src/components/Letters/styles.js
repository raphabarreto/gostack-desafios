import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.span`
  border-radius: 80%;
  padding: 15px 15px;
  margin-right: 10px;
  background: #f4effc;
  font-size: 14px;
  font-weight: bold;
  color: ${darken(0.25, '#F4EFFC')};
`;
