import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap');
  @font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin : 0;
    padding : 0;
    font-family: 'Roboto', 'NanumSquareRound', sans-serif;
  }
  *{margin: 0; padding: 0;}
`

export default GlobalStyle;