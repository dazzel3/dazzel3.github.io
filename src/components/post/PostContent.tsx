import React from 'react';
import styled from '@emotion/styled';

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
  line-height: 1.8;
  font-size: 1.7rem;
  font-weight: 400;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    line-height: 1.7;
    font-size: 1.6rem;
  }

  p {
    padding: 0.3rem 0;
  }

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

    @media screen and (max-width: 767px) and (orientation: portrait) {
      font-size: 2.4rem;
    }
  }

  h2 {
    font-size: 2.8rem;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      font-size: 2.2rem;
    }
  }

  h3 {
    font-size: 2.4rem;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      font-size: 1.9rem;
    }
  }

  blockquote {
    margin: 3rem 0;
    padding: 0.7rem 2.2rem;
    border-left: 5px solid ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }

  ol,
  ul {
    margin-left: 1.7rem;
    padding: 0.2rem 0;
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

  hr {
    border: 0.4px solid ${({ theme }) => theme.colors.opacityBlue};
    margin: 4rem 0;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      margin: 2.5rem 0;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.main};
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.main};

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

  details {
    padding-left: 0.5rem;
    margin: 0.1rem 0;

    & > div {
      padding-left: 1.3rem;
      margin: 1rem 0;
    }
  }

  aside {
    border: 1.3px solid ${({ theme }) => theme.colors.opacityGray};
    border-radius: 0.4rem;
    padding: 1.5rem 2rem;
    margin-top: 1rem;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      padding: 1.2rem 1.8rem;
      margin-top: 0.5rem;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'NotoSansMono';
    tab-size: 2;
  }

  code[class*='language-'] {
    padding: 0.2rem 0.6rem;
    margin: 0 0.1rem;
    color: ${({ theme }) => theme.colors.main};
    background-color: ${({ theme }) => theme.colors.codeBg};
    font-size: 1.5rem;
    border-radius: 0.4rem;

    @media screen and (max-width: 767px) and (orientation: portrait) {
      font-size: 1.4rem;
      padding: 0.1rem 0.5rem;
    }
  }

  pre[class*='language-'] {
    margin: 3rem 0;
    padding: 4rem;
    background-color: ${({ theme }) => theme.colors.codeBg};

    @media screen and (max-width: 767px) and (orientation: portrait) {
      padding: 2rem;
      margin: 2rem 0;
    }

    code[class*='language-'] {
      color: ${({ theme }) => theme.colors.deepGray};
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 0.3rem;
    }
  }
`;
