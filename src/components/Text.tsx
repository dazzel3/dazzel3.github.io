import React from 'react';

type TextProps = {
  text: string;
};

const Text = ({ text }: TextProps) => {
  return <div>{text}</div>;
};

export default Text;
