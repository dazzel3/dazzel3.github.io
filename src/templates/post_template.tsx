import React from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';
import { PostListItemType } from 'types/postItem';
import PostHead from 'components/post/PostHead';
import styled from '@emotion/styled';

interface PostTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
  };
}

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PostTemplateProps) => {
  const {
    node: {
      frontmatter: { title, date, categories },
    },
  } = edges[0];

  return (
    <Template>
      <Container>
        <PostHead title={title} date={date} categories={categories} />
      </Container>
    </Template>
  );
};

export default PostTemplate;

const Container = styled.div`
  width: 54%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
