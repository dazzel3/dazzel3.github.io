import React, { ButtonHTMLAttributes } from 'react';
import { Link } from 'gatsby';

interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
}

const LinkButton = ({ to, children }: LinkButtonProps) => {
  return <Link to={to}>{children}</Link>;
};

export default LinkButton;
