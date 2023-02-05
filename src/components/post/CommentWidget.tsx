import styled from '@emotion/styled';
import React, { useRef, useEffect } from 'react';

const src = 'https://utteranc.es/client.js';
const repo = 'dazzel3/dazzel3.github.io';

interface UtterancesAttributesType {
  src: string;
  repo: string;
  'issue-term': string;
  label: string;
  theme: string;
  crossorigin: string;
  async: string;
}

const CommentWidget = () => {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (element.current === null) return;

    const utterances: HTMLScriptElement = document.createElement('script');

    const attributes: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'pathname',
      label: '✨Comment',
      theme: `github-light`,
      crossorigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return <Comment ref={element} />;
};

const Comment = styled.div`
  width: 100%;
  margin: 3rem 0;
`;

export default CommentWidget;
