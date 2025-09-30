import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { ThemeProviderProps } from '@emotion/react';

interface LinkButtonProps {
  to: string;
  active?: boolean;
  hover?: boolean;
  children?: ReactNode;
  theme?: ThemeProviderProps;
}

const LinkButton = ({ to, active, hover, children }: LinkButtonProps) => {
  return (
    <LinkContainer to={to} active={active} hover={hover}>
      {children}
    </LinkContainer>
  );
};

export default LinkButton;

const LinkContainer = styled(Link, {
  shouldForwardProp: prop => prop !== 'active' && prop !== 'hover',
})<LinkButtonProps>`
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: 0.4s ease;
  color: ${({ active, theme }) => (active ? theme.colors.main : 'inherit')};

  &:hover {
    color: ${({ hover, active, theme }) =>
      hover || active ? theme.colors.main : 'inherit'};
  }

  &:active {
    color: ${({ theme }) => theme.colors.deepBlue};
  }
`;
