import React from 'react';
import styled from '@emotion/styled';
import { PostFrontmatterType } from 'types/postItem';
import { Link } from 'gatsby';
import COLOR from 'utils/color';

interface PostItemProps extends PostFrontmatterType {
  link: string;
}

const PostItem = ({
  title,
  date,
  categories,
  summary,
  link,
}: PostItemProps) => {
  return (
    <PostItemContent to={link}>
      <Title>{title}</Title>
      <Summary>{summary}</Summary>
      <Date>{date}</Date>
      <Category>
        {categories.tags.map(category => (
          <CategoryItem key={category}>{category}</CategoryItem>
        ))}
      </Category>
    </PostItemContent>
  );
};

export default PostItem;

const PostItemContent = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.6rem 3rem;
  border-radius: 1.5rem;
  margin: 0.5rem 0;
  transition: 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 20px rgba(33, 134, 250, 0.08);

    & > h1 {
      color: ${COLOR.main};
      transition: inherit;
    }
  }

  &:active {
    transition: linear;
    box-shadow: 0 0 1.2px rgba(33, 134, 250, 0.7);

    & > h1 {
      color: ${COLOR.deepBlue};
      transition: inherit;
    }
  }

  @media screen and (max-width: 767px) and (orientation: portrait) {
    &:hover {
      box-shadow: none;
    }
  }
`;

const Title = styled.h1`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.4rem;
  margin-top: 0.2rem;
`;

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1.6rem;
  line-height: 2.4rem;
  opacity: 0.8;
`;

const Date = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${COLOR.gray};
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const CategoryItem = styled.div`
  padding: 0.8rem 1.4rem;
  font-weight: 500;
  font-size: 1.3rem;
  background-color: ${COLOR.opacityBlue};
  color: ${COLOR.main};
  border-radius: 2rem;
  margin-top: 0.8rem;
`;
