import React from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';
import { PostContentType } from 'types/postItem';
import PostHead from 'components/post/PostHead';
import styled from '@emotion/styled';
import PostContent from 'components/post/PostContent';
import CommentWidget from 'components/post/CommentWidget';
interface PostTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: PostContentType[];
    };
  };
  location: {
    href: string;
  };
}

const PostTemplate = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}: PostTemplateProps) => {
  const {
    node: {
      html,
      frontmatter: {
        title,
        summary,
        date,
        categories,
        thumbnail: { publicURL },
      },
    },
  } = edges[0];

  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <Container>
        <PostHead title={title} date={date} categories={categories} />
        <PostContent html={html} />
        <CommentWidget />
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
            date(formatString: "YYYY.MM.DD")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
              publicURL
            }
          }
        }
      }
    }
  }
`;
