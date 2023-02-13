import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from './GlobalStyle';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import { Helmet } from 'react-helmet';

interface TemplateProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  children: ReactNode;
}

const Template = ({
  title,
  description,
  url,
  image,
  children,
}: TemplateProps) => {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/* <meta name="twitter:image" content={image} /> */}
        <meta name="twitter:site" content="@dayeon" />
        <meta name="twitter:creator" content="@dayeon" />

        {/* <meta name="color-scheme" content="dark light"></meta> */}

        <meta
          name="google-site-verification"
          content="P6dJIZhj6XPeaADnK32PCllV74sEhqOMgRMr51rDdFk"
        />
        <meta
          name="naver-site-verification"
          content="13f49279dffe9cc0d08e653dd0684a5f2a320fc3"
        />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  height: 100%;
`;
