import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100%;
  max-height: 425px;
  text-align: center;
  background: white;
  border-radius: 4px;
  padding: 25px;

  img {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-size: 10px;
      font-weight: bold;
      text-align: left;
      margin-bottom: 5px;
    }

    label:nth-child(3) {
      margin-top: 10px;
    }

    input {
      font-size: 12px;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 44px;
      padding: 15px 15px;
      margin: 10px 1px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin: 0 0 5px;
      font-weight: bold;
    }

    button {
      margin-top: 20px;
      height: 44px;
      background: #7d40e7;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
