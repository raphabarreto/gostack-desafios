import styled from 'styled-components';

export const Container = styled.div`
  max-width: 90%;
  margin: 50px auto;

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

export const RecipientsTable = styled.table`
  border-spacing: 0 10px;
  width: 100%;

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
  td {
    width: 100px;
  }

  td > img {
    width: 20%;
    border-radius: 50%;
  }

  td:first-child {
    border-top-left-radius: 0.9em;
    border-bottom-left-radius: 0.9em;
  }

  td:last-child {
    border-top-right-radius: 0.9em;
    border-bottom-right-radius: 0.9em;
    text-align: right;
    color: #c6c6c6;
  }

  thead th:last-child {
    text-align: right;
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
  margin-left: calc(17.3% - 2em);

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
    width: 100px;

    background: #fff;
    border-bottom: 0.5px solid #ddd;
    color: #999999;

    &:last-child {
      border-bottom: 0;
    }
  }
`;
