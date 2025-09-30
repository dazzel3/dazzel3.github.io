import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyle = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        html {
          font-size: 62.5%;
        }

        body {
          font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
            'Segoe UI', sans-serif;
          background-color: ${theme.colors.defaultBg};
          color: ${theme.colors.deepGray};
          line-height: 1.5;
        }

        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }

        ol,
        ul {
          list-style: none;
        }

        blockquote,
        q {
          quotes: none;
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: '';
          content: none;
        }

        button {
          border: none;
          background-color: transparent;
          padding: 0;
          margin: 0;
          cursor: pointer;
        }

        input {
          border: none;
          outline: none;
        }

        a {
          color: inherit;
          text-decoration: none;
          outline: none;
        }
      `}
    />
  );
};

export default GlobalStyle;
