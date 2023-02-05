import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface PostFrontmatterType {
  title: string;
  summary: string;
  date: string;
  categories: string[];
  thumbnail: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    publicURL: string;
  };
}

export interface PostListItemType {
  node: {
    id: string;
    fields: {
      slug: string;
    };
    frontmatter: PostFrontmatterType;
  };
}

export interface PostContentType {
  node: {
    html: string;
    frontmatter: PostFrontmatterType;
  };
}
