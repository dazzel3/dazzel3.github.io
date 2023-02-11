import React from 'react';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';

const Mode = () => {
  return (
    <Button>
      <StaticImage
        src="../../assets/images/dark-mode.png"
        alt="dark-mode"
        placeholder="blurred"
        style={{ width: '1.7rem', height: '1.7rem' }}
      />
    </Button>
  );
};

export default Mode;

const Button = styled.button`
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 50%;
  transition: 0.4s ease;

  &:hover {
    background: #2186fa46;
  }
`;
