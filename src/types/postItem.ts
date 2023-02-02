export type PostFrontmatterType = {
  title: string;
  summary: string;
  date: string;
  categories: string[];
  thumbnail: {
    publicURL: string;
  };
};

export type PostListItemType = {
  node: {
    id: string;
    frontmatter: PostFrontmatterType;
  };
};
