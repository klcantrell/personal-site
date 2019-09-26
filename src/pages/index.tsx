import React from 'react';
import 'slick-carousel/slick/slick.css';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Landing from '../components/landing';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Landing />
  </Layout>
);

export default IndexPage;
