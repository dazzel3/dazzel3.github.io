import React from 'react';
import styled from '@emotion/styled';
import { LIGHT_COLOR } from 'utils/color';

interface PostContentProps {
  html: string;
}

const PostContent = ({ html }: PostContentProps) => {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;

const MarkdownRenderer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  // Markdown Style
  line-height: 1.8;
  font-size: 1.7rem;
  font-weight: 400;

  // Apply Padding Attribute to All Elements
  p {
    padding: 0.3rem 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 3rem;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      margin-top: 1rem;
    }
  }

  h1 {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2.8rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  // Adjust Quotation Element Style
  blockquote {
    margin: 3rem 0;
    padding: 0.7rem 2.2rem;
    border-left: 5px solid ${LIGHT_COLOR.main};
    background-color: ${LIGHT_COLOR.lightBlue};
  }

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 2rem;
    padding: 0.3rem 0;
  }

  ol {
    list-style: decimal;
  }

  ul {
    li {
      list-style-type: disc;

      li {
        list-style-type: circle;

        li {
          list-style-type: square;
        }
      }
    }
  }

  // Adjust Horizontal Rule style
  hr {
    border: 0.4px solid ${LIGHT_COLOR.opacityBlue};
    margin: 4rem 0;
  }

  // Adjust Link Element Style
  a {
    color: ${LIGHT_COLOR.main};
    border-bottom: 0.5px solid ${LIGHT_COLOR.main};

    &:hover {
      border-bottom-width: 1px;
    }
  }

  b,
  strong {
    font-weight: 600;
  }

  em {
    margin-right: 0.2rem;
  }

  aside {
    border: 1.3px solid ${LIGHT_COLOR.opacityGray};
    border-radius: 0.4rem;
    padding: 1.5rem 2rem;
    margin-top: 1rem;
  }

  // Adjust Code Style
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'NotoSansMono';
    tab-size: 2;
  }

  code[class*='language-'] {
    padding: 0.2rem 0.6rem;
    margin: 0 0.2rem;
    color: ${LIGHT_COLOR.main};
    font-size: 1.5rem;
    background-color: ${LIGHT_COLOR.codeBg};
    border-radius: 0.4rem;
    word-break: keep-all;
  }

  pre[class*='language-'] {
    margin: 3.7rem 0;
    padding: 4rem;
    background-color: ${LIGHT_COLOR.codeBg};

    @media screen and (max-width: 767px) and (orientation: portrait) {
      padding: 3rem;
    }

    code[class*='language-'] {
      color: ${LIGHT_COLOR.deepGray};
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0.3rem;
    }
  }
`;
