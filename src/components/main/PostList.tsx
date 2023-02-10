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
  margin-bottom: 3rem;
`;
