import styled from '@emotion/styled';
import React from 'react';
import LinkButton from 'components/common/LinkButton';

export interface CategoryListProps {
  selectedCategory: string;
  categoryList: {
    [key: string]: number;
  };
}

const CategoryList = ({
  selectedCategory,
  categoryList,
}: CategoryListProps) => {
  return (
    <Container>
      {Object.entries(categoryList).map(([name, count]) => (
        <LinkButton
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          {name} ({count})
        </LinkButton>
      ))}
    </Container>
  );
};

export default CategoryList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1.5rem;
`;
