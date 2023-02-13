import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { LIGHT_COLOR } from 'utils/color';

interface LinkButtonProps {
  to: string;
  active?: boolean;
  hover?: boolean;
  children?: ReactNode;
}

const LinkButton = ({ to, active, hover, children }: LinkButtonProps) => {
  return (
    <LinkContainer to={to} active={active} hover={hover}>
      {children}
    </LinkContainer>
  );
};

export default LinkButton;

const LinkContainer = styled(({ active, hover, ...props }: LinkButtonProps) => (
  <Link {...props} />
))`
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: 0.4s ease;
  color: ${({ active }) => (active ? LIGHT_COLOR.main : 'inherit')};

  &:hover {
    color: ${({ hover }) => (hover ? LIGHT_COLOR.main : 'inherit')};
  }

  &:active {
    color: ${LIGHT_COLOR.deepBlue};
  }
`;
