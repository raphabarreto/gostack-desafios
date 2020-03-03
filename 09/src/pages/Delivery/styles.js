import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 90%;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  p {
    display: flex;
    align-self: flex;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  header {
    display: flex;
    justify-content: space-between;

    input {
      width: 237px;
      height: 36px;
      border: 2px solid #dddddd;
      border-radius: 5px;
    }

    input::placeholder {
      display: flex;
      padding: 10px;
    }

    button {
      width: 150px;
      height: 40px;
      border: 1px solid;
      border-radius: 5px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
    }
  }
`;

export const DeliveryTable = styled.table`
  border-spacing: 0 10px;

  thead th {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 15px;
    text-align: left;
    color: #444444;
  }

  tbody tr {
    background-color: #ffffff;
  }

  tbody td {
    font-size: 16px;
    padding: 20px;
    padding-left: 15px;
    text-align: left;
    color: #666666;
  }

  td:first-child {
    border-top-left-radius: 0.9em;
    border-bottom-left-radius: 0.9em;
  }

  td:last-child {
    border-top-right-radius: 0.9em;
    border-bottom-right-radius: 0.9em;
  }

  td:nth-child(7) {
    text-align: right;
    color: #c6c6c6;
  }

  thead th:nth-child(7) {
    text-align: right;
  }

  td > span {
    border-radius: 0.9em;
    justify-content: left;
    padding: 5px 10px;
    background: #dff0df;
    font-size: 14px;
    font-weight: bold;
    color: ${darken(0.3, '#DFF0DF')};
  }

  .react-icons-bullet {
    vertical-align: -5px;
  }

  .deliveryman-name {
    border-radius: 80%;
    padding: 15px 15px;
    margin-right: 10px;
    background: #f4effc;
    font-size: 14px;
    font-weight: bold;
    color: ${darken(0.25, '#F4EFFC')};
  }
`;
