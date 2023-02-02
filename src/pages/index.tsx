import React from 'react';
import GlobalStyle from 'components/common/GlobalStyle';
import Header from 'components/header/Header';
import CategoryList from 'components/main/CategoryList';
import PostList, { PostProps } from 'components/main/PostList';
import Footer from 'components/footer/Footer';
import { graphql } from 'gatsby';

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: PostProps[];
    };
  };
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <PostList posts={edges} />
      <Footer />
    </>
  );
};

export default IndexPage;

export const getPostList = graphql`
  query getPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YY.MM.DD")
            summary
            categories
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`;
