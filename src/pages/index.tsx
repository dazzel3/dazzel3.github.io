import React, { useMemo } from 'react';
import GlobalStyle from 'components/common/GlobalStyle';
import Header from 'components/header/Header';
import CategoryList from 'components/main/CategoryList';
import PostList from 'components/main/PostList';
import Footer from 'components/footer/Footer';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/postItem';
import queryString, { ParsedQuery } from 'query-string';
import { CategoryListProps } from '../components/main/CategoryList';

interface IndexPageProps {
  location: {
    search: string;
  };
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
  };
}

const IndexPage = ({
  location: { search },
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category;

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach(category => {
            list[category] =
              list[category] === undefined ? 1 : list[category] + 1;
          });

          list['All'] += 1;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  return (
    <>
      <GlobalStyle />
      <Header />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
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
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
  }
`;
