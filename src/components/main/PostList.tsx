import React from 'react';
import styled from '@emotion/styled';
import PostItem from './PostItem';

export interface PostProps {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      thumbnail: {
        publicURL: string;
      };
    };
  };
}

interface PostListProps {
  posts: PostProps[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <PostListWrapper>
      {posts.map(({ node: { id, frontmatter } }: PostProps) => (
        <PostItem {...frontmatter} link="https://www.google.co.kr/" key={id} />
      ))}
    </PostListWrapper>
  );
};

export default PostList;

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;
`;
