import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @font-face {
    font-family: "Roboto";
    src: url("../assets/fonts/Roboto-Regular.ttf") format('ttf');
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #f5f5f5;
  }

  body, input, button {
    font: 14px 'Robot', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
   }

  .react-icons {
      vertical-align: -7px;
  }
`;
