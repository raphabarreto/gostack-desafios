import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    img {
      padding: 5px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px dashed #dddddd;
    }
    input {
      display: none;
    }
  }
`;
