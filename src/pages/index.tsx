import React, { useMemo } from 'react';
import Template from 'components/common/Template';
import CategoryList from 'components/main/CategoryList';
import PostList from 'components/main/PostList';
import { graphql } from 'gatsby';
import { PostListItemType } from 'types/postItem';
import queryString, { ParsedQuery } from 'query-string';
import { CategoryListProps } from '../components/main/CategoryList';
import styled from '@emotion/styled';

interface IndexPageProps {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: PostListItemType[];
    };
  };
}

const IndexPage = ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
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
    <Template title={title} description={description} url={siteUrl}>
      <Container>
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
        <PostList selectedCategory={selectedCategory} posts={edges} />
      </Container>
    </Template>
  );
};

export default IndexPage;

const Container = styled.div`
  width: 54%;
  padding-top: 3rem;
`;

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
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
