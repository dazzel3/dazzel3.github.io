import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

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
  font-weight: ${({ active }) => (active ? '700' : '500')};
  transition: 0.4s ease;

  &:hover {
    color: ${({ hover }) => (hover ? '#2186fa' : 'inherit')};
  }
`;
