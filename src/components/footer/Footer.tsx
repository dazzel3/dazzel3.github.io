import styled from '@emotion/styled';
import React from 'react';

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Text>Copyright © 2023 Sally</Text>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #f6f6f6;
`;

const Text = styled.h1`
  color: #464646;
  font-size: 1.5rem;
`;
