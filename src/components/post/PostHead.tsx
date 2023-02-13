import React from 'react';
import styled from '@emotion/styled';
import { LIGHT_COLOR } from 'utils/color';

interface PostHeadProps {
  title: string;
  date: string;
  tags: string[];
}

const PostHead = ({ title, date, tags }: PostHeadProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Date>{date}</Date>
      <Wrapper>
        {tags.map(tag => (
          <Category key={tag}>{tag}</Category>
        ))}
      </Wrapper>
    </Container>
  );
};

export default PostHead;

const Container = styled.div`
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 5.5rem 0;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    width: 92%;
    gap: 2rem;
    padding: 4rem 0;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 3.7rem;
  line-height: 4.5rem;
  word-break: keep-all;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 3.4rem;
    text-align: center;
    font-size: 2.7rem;
    line-height: 3.6rem;
  }
`;

const Date = styled.h3`
  font-weight: 400;
  font-size: 1.7rem;
  color: ${LIGHT_COLOR.gray};

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.5rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;
`;

const Category = styled.div`
  padding: 1rem 1.6rem;
  font-weight: 500;
  font-size: 1.4rem;
  background-color: ${LIGHT_COLOR.opacityBlue};
  color: ${LIGHT_COLOR.main};
  border-radius: 2rem;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    font-size: 1.2rem;
    padding: 0.8rem 1.4rem;
  }
`;
