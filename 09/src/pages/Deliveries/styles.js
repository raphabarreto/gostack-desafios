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
`;

export const Header = styled.div`
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
    padding-left: 5px;
  }

  input {
    box-sizing: border-box;
    padding: 15px;
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
`;

export const Search = styled.div`
  background: #fff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;

  input {
    border: 0;
    font-size: 14px;
    color: #999999;
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
    border: 1px solid #ddd;
    border-radius: 15px;
    box-shadow: 2px 2px 2px #ddd;
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

  td:nth-child(8) {
    text-align: right;
    color: #c6c6c6;
  }

  thead th:nth-child(8) {
    text-align: right;
  }
`;

export const Status = styled.span.attrs({
  delivered: '#2CA42B',
  pending: '#C1BC35',
  canceled: '#DE3B3B',
  withdraw: '#4D85EE',
})`
  border-radius: 0.9em;
  justify-content: left;
  padding: 5px 10px;
  background: #dff0df;
  font-size: 14px;
  font-weight: bold;

  color: ${props => {
    switch (props.status) {
      case 'ENTREGUE':
        return props.delivered;
      case 'PENDENTE':
        return props.pending;
      case 'CANCELADA':
        return props.canceled;
      default:
        return props.withdraw;
    }
  }};

  background-color: ${props => {
    switch (props.status) {
      case 'ENTREGUE':
        return lighten(0.5, props.delivered);
      case 'PENDENTE':
        return lighten(0.45, props.pending);
      case 'CANCELADA':
        return lighten(0.3, props.canceled);
      default:
        return lighten(0.3, props.withdraw);
    }
  }};

  .react-icons-bullet {
    vertical-align: -5px;
  }
`;

export const ActionButton = styled.div`
  button {
    border: none;
    background: none;
    color: #999999;
  }
`;

export const ActionList = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  background: #fff;
  height: 110px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ddd;
  margin-left: calc(5% - 4.5em);

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 11px solid #ddd;
    position: absolute;
    top: -11px;
    left: 50%;
    margin-left: -10px;
  }

  button {
    display: flex;
    height: 120px;
    width: 110px;
    text-align: center;

    background: #fff;
    border-bottom: 0.5px solid #ddd;
    color: #999999;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const View = styled.div`
  display: ${props => (props.view ? 'flex' : 'none')};
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 5;
  top: 200px;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #ddd;

  button {
    border: none;
    background: none;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
    margin-bottom: 15px;

    svg {
      margin-left: 150px;
    }
  }

  .street,
  .city,
  .zipCode {
    font-size: 16px;
    color: #666;
    padding-bottom: 10px;
  }

  .dates {
    margin: 5px 0;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }
  .withdraw,
  .delivery {
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }

  .zipCode,
  .delivery {
    padding-bottom: 5px;
    border-bottom: 1px solid #eeeeee;
  }

  .signature {
    margin: 5px 0;
    font-size: 14px;
    font-weight: bold;
    color: #444444;
  }

  img {
    width: 240px;
    height: 150px;
    margin: 5px 70px;
  }
`;
