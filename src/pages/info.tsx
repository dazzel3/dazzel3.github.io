import React from 'react';
import Text from 'components/Text';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        author: string;
        description: string;
        title: string;
      };
    };
  };
};

const InfoPage = ({
  data: {
    site: {
      siteMetadata: { author, description, title },
    },
  },
}: InfoPageProps) => {
  return (
    <div>
      <Text text={author} />
      <Text text={description} />
      <Text text={title} />
      <Link to="/">To Main</Link>
    </div>
  );
};

export default InfoPage;

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        author
        description
        title
      }
    }
  }
`;
