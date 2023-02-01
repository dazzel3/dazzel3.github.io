import React from 'react';
import '../assets/styles/font.css';
import GlobalStyle from 'components/common/GlobalStyle';
import Header from 'components/header/Header';
import CategoryList from 'components/main/CategoryList';
import Footer from 'components/footer/Footer';

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <Footer />
    </>
  );
};

export default IndexPage;
