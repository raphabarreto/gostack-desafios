import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  align-self: center;
  display: flex;
  flex-direction: column;
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
  height: 450px;

  label {
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    font-weight: bold;
    color: #444444;
  }

  span {
    color: #fb6c91;
    display: block;
    font-weight: bold;
    margin: 0 20px;
  }

  input {
    margin: 20px 20px;
    width: 840px;
    height: 45px;
    border: 1px solid #dddddd;
    border-radius: 5px;
  }

  .secondLine {
    display: flex;
    justify-content: space-between;

    .street {
      width: 400px;
      display: flex;
      flex-direction: row;
    }

    .number {
      width: 100px;
      display: flex;
      flex-direction: row;
    }

    .complement {
      width: 180px;
      display: flex;
      flex-direction: row;
    }
  }

  .thirdLine {
    display: flex;
    justify-content: space-between;
  }

  .city {
    width: 250px;
    display: flex;
    flex-direction: row;
  }

  .state {
    width: 250px;
    display: flex;
    flex-direction: row;
  }

  .zipCode {
    width: 180px;
    display: flex;
    flex-direction: row;
  }
`;
