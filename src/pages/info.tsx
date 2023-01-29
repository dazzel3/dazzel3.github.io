import React from 'react';
import { graphql } from 'gatsby';

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
      {author} {description} {title}
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
