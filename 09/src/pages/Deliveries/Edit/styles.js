import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  h1 {
    display: flex;
    flex: 1;
    margin-top: 5px;
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
`;

export const BackButton = styled.button`
  width: 112px;
  height: 36px;
  border: 1px solid;
  border-radius: 5px;
  background: #cccccc;
  color: #fff;
  font-weight: bold;
  margin-right: 15px;
`;

export const SaveButton = styled.button`
  width: 112px;
  height: 36px;
  border: 1px solid;
  border-radius: 5px;
  background: #7d40e7;
  color: #fff;
  font-weight: bold;
`;

export const FormContainer = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  background: #ffffff;
  height: 250px;

  span {
    margin: 20px 25px;
    font-weight: bold;
    color: #444444;

    span {
      color: #fb6c91;
    }
  }

  label {
    display: flex;
    margin: 0px 20px;
    margin-top: 10px;
    font-weight: bold;
  }

  input {
    margin: 20px 25px;
    width: 850px;
    height: 45px;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }

  .firstLine {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    select {
      margin-top: 10px;
      width: 400px;
      display: flex;
      cursor: pointer;
      height: 45px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }
`;
