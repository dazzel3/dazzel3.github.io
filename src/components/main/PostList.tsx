import React from 'react';
import styled from '@emotion/styled';
import PostItem from './PostItem';
import { PostListItemType } from 'types/postItem';
import useInfiniteScroll, {
  useInfinitieScrollType,
} from 'hooks/useInfiniteScroll';

interface PostListProps {
  selectedCategory: string;
  posts: PostListItemType[];
}

const PostList = ({ selectedCategory, posts }: PostListProps) => {
  const { containerRef, postList }: useInfinitieScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  );

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem {...frontmatter} link={slug} key={id} />
        ),
      )}
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
