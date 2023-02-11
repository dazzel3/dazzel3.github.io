import styled from '@emotion/styled';
import React from 'react';
import LinkButton from 'components/common/LinkButton';
import COLOR from 'utils/color';

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
      <Wrapper>
        {Object.entries(categoryList).map(([name, count]) => (
          <CategoryItem>
            <LinkButton
              to={`/?category=${encodeURI(name)}`}
              active={name === selectedCategory}
              key={name}
            >
              {name}
            </LinkButton>
          </CategoryItem>
        ))}
      </Wrapper>
    </Container>
  );
};

export default CategoryList;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  gap: 2rem;
  margin: 0.5rem 1rem;
  padding: 2rem 1rem;
  white-space: nowrap;
  overflow-x: auto;

  @media screen and (max-width: 767px) and (orientation: portrait) {
    gap: 1.5rem;
    font-size: 1.5rem;
  }
`;

const CategoryItem = styled.div`
  color: ${COLOR.gray};
`;
