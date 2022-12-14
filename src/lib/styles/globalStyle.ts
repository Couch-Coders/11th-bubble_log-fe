import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const globalStyle = css`
  ${reset}

  *,
  body {
    font-family: 'Noto-Sans KR', sans-serif;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
