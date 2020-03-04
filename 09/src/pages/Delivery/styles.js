import styled from 'styled-components';
import { lighten } from 'polished';

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
`;

export const Status = styled.span.attrs(props => ({
  delivered: '#2CA42B',
  pending: '#C1BC35',
  canceled: '#DE3B3B',
  withdraw: '#4D85EE',
}))`
  border-radius: 0.9em;
  justify-content: left;
  padding: 5px 10px;
  background: #dff0df;
  font-size: 14px;
  font-weight: bold;

  color: ${props => {
    switch (props.status) {
      case 'delivered':
        return props.delivered;
      case 'pending':
        return props.pending;
      case 'canceled':
        return props.canceled;
      default:
        return props.withdraw;
    }
  }};

  background-color: ${props => {
    switch (props.status) {
      case 'delivered':
        return lighten(0.5, props.delivered);
      case 'pending':
        return lighten(0.45, props.pending);
      case 'canceled':
        return lighten(0.3, props.canceled);
      default:
        return lighten(0.3, props.withdraw);
    }
  }};

  .react-icons-bullet {
    vertical-align: -5px;
  }
`;
