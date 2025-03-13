'use client';

import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%; // 1rem = 10px == 10/16px = 62.5% (1.4rem = 14px);
    }

    html,
    body,
    #__next {
      height: 100%;
    }

    body {
      font-size: ${theme.font.sizes.sm};
    }
  `}
`;

export default GlobalStyles;
