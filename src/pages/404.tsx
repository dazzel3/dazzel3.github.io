import React from 'react';
import styled from '@emotion/styled';
import Template from 'components/common/Template';
import LinkButton from 'components/common/LinkButton';
import { LIGHT_COLOR } from 'utils/color';

const NotFoundPage = () => {
  return (
    <Template>
      <Container>
        <Text>404 Not Found.</Text>
        <Description>찾을 수 없는 페이지입니다.</Description>
        <LinkButton to="/" hover={true}>
          메인으로 돌아가기
        </LinkButton>
      </Container>
    </Template>
  );
};

export default NotFoundPage;

const Container = styled.div`
  width: 54%;
  height: 77vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.6rem;
  opacity: 0.5;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    height: 80vh;
    gap: 1.2rem;
    font-size: 1.4rem;
    background-color: ${LIGHT_COLOR.opacityGray};
  }
`;

const Text = styled.div`
  font-size: 6rem;
  font-weight: 800;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 3.4rem;
    font-weight: 800;
  }
`;

const Description = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.8rem;
  }
`;
