import React from 'react';
import styled from '@emotion/styled';
import Template from 'components/common/Template';
import LinkButton from 'components/common/LinkButton';

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
`;

const Text = styled.div`
  font-size: 8rem;
  font-weight: 800;
`;

const Description = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;
