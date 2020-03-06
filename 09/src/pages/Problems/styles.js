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

export const ProblemsTable = styled.table`
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
  width: 150px;
  height: 90px;
  right: 50px;
  border-radius: 4px;
  padding: 15px 5px;

  a,
  button {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #ddd;
    color: #999999;
    margin-top: 5px;

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const View = styled.nav`
  display: ${props => (props.view ? 'flex' : 'none')};
  position: absolute;
  background: #fff;
  top: auto;
  left: auto;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 5;
  top: 200px;
  border-radius: 4px;
  padding: 15px;
  flex-direction: column;
  header {
    display: flex;
    justify-content: space-between;
    button {
      border: 0;
      background: none;
    }
  }
  h1 {
    font-weight: bold;
    font-size: 14px;
  }
  p {
    text-align: left;
  }
`;