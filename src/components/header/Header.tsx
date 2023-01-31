import React from 'react';
import styled from '@emotion/styled';
import LinkButton from 'components/common/LinkButton';
import Mode from './Mode';

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <LinkButton to="/">Sally-Day</LinkButton>
        </Logo>

        <ButtonContainer>
          <LinkButton to="/">Blog</LinkButton>
          <LinkButton to="/about">About</LinkButton>
          <Mode />
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 3px rgba(218, 218, 218, 0.25);
`;

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const Logo = styled.div`
  font-family: 'MonoplexKR-Italic';
  font-size: 2.5rem;
  font-weight: 700;
  padding: -0.2rem 0.1rem;
  transition: 0.2s ease-in-out;

  & * {
    transition: 0.2s ease;
  }

  & *:hover {
    color: #2186fa;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;

  & * {
    transition: 0.2s ease;
  }

  & *:hover {
    color: #2186fa;
  }
`;
