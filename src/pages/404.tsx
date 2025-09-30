import React from 'react';
import styled from '@emotion/styled';
import Template from 'components/common/Template';
import LinkButton from 'components/common/LinkButton';
import { Frown } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Template title="404 Not Found">
      <Container>
        <Icon>
          <Frown size={64} />
        </Icon>
        <Text>404 Not Found</Text>
        <Description>요청하신 페이지를 찾을 수 없습니다.</Description>
        <StyledLinkButton to="/" hover={true}>
          메인으로 돌아가기
        </StyledLinkButton>
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
  text-align: center;
  color: ${({ theme }) => theme.colors.gray};

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    height: 80vh;
    gap: 1rem;
    font-size: 1.4rem;
    padding: 0 1rem;
  }
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.colors.main};
  opacity: 0.8;
`;

const Text = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.deepGray};

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 2.3rem;
  }
`;

const Description = styled.div`
  font-size: 1.7rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray};
  line-height: 1.5;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.3rem;
  }
`;

const StyledLinkButton = styled(LinkButton)`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.main};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.deepBlue};
  }
`;
