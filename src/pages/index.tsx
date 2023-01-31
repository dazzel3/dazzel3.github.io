import React from 'react';
import '../assets/styles/font.css';
import GlobalStyle from 'components/common/GlobalStyle';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Footer />
    </>
  );
};

export default IndexPage;
