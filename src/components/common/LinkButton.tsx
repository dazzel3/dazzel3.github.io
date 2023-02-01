import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

interface LinkButtonProps {
  to: string;
  active?: boolean;
  children?: ReactNode;
}

const LinkButton = ({ to, active, children }: LinkButtonProps) => {
  return (
    <LinkContainer to={to} active={active}>
      {children}
    </LinkContainer>
  );
};

export default LinkButton;

const LinkContainer = styled(({ active, ...props }: LinkButtonProps) => (
  <Link {...props} />
))`
  font-weight: ${({ active }) => (active ? '700' : '500')};
`;
