import React from 'react';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';
import { LIGHT_COLOR } from 'utils/color';
import { useDarkMode } from 'context/DarkModeContext';

const Mode = () => {
  const { darkMode, toggleMode } = useDarkMode();
  return (
    <Button onClick={toggleMode}>
      {darkMode ? (
        <StaticImage
          src="../../assets/images/light-mode.png"
          alt="light-mode"
          placeholder="blurred"
          style={{ width: '1.7rem', height: '1.7rem' }}
        />
      ) : (
        <StaticImage
          src="../../assets/images/dark-mode.png"
          alt="dark-mode"
          placeholder="blurred"
          style={{ width: '1.7rem', height: '1.7rem' }}
        />
      )}
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
    background: ${LIGHT_COLOR.opacityBlue};
  }
`;
