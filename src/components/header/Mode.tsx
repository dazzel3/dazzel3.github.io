import React from 'react';
import styled from '@emotion/styled';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from 'context/DarkModeContext';

const Mode = () => {
  const { darkMode, toggleMode } = useDarkMode();
  return (
    <Button onClick={toggleMode}>
      {darkMode ? (
        <Sun size={20} color="#e0e0e0" />
      ) : (
        <Moon size={20} color="#3d3d3d" />
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
    background: ${({ theme }) => theme.colors.opacityBlue};
  }
`;
