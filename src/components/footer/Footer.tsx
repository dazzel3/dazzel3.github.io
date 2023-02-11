import styled from '@emotion/styled';
import React from 'react';
import LinkButton from 'components/common/LinkButton';
import COLOR from 'utils/color';

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Text>
          Copyright ⓒ 2023{' '}
          <LinkButton to="https://github.com/dazzel3">Dayeon Won</LinkButton>{' '}
          All rights reserved. <br />
          Powered By{' '}
          <LinkButton to="https://github.com/dazzel3/tech-blog-ts">
            gatsby-tech-blog
          </LinkButton>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    height: 9vh;
  }
`;

const Wrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${COLOR.lightGray};

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 90%;
  }
`;

const Text = styled.h1`
  color: ${COLOR.gray};
  text-align: center;
  font-size: 1.3rem;
  line-height: 2.2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.2rem;
  }
`;
