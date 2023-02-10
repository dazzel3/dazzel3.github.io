import React from 'react';
import styled from '@emotion/styled';
import LinkButton from 'components/common/LinkButton';
import { PostFrontmatterType } from 'types/postItem';

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
    <LinkButton to={link}>
      <PostItemContent>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <Date>{date}</Date>
        <Category>
          {categories.map(category => (
            <CategoryItem key={category}>{category}</CategoryItem>
          ))}
        </Category>
      </PostItemContent>
    </LinkButton>
  );
};

export default PostItem;

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.6rem 3rem;
  border-radius: 1.5rem;
  transition: 0.3s ease-out;
  margin: 0.5rem 0;

  &:hover {
    box-shadow: 0px 0px 20px rgba(33, 134, 250, 0.06);
  }
`;

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 2.3rem;
  font-weight: 700;
  margin-top: 0.1rem;
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
  color: #9f9f9f;
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
  background-color: #2186fa1e;
  color: #2186fa;
  border-radius: 2rem;
  margin-top: 0.8rem;
`;
