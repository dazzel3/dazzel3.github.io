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
