import React from 'react';
import { NextPage } from 'next';

// material-ui
import Container from '@material-ui/core/Container';

// components
import Hero from '~/components/Hero';

const IndexPage: NextPage = () => (
  <Container maxWidth="sm">
    <Hero />
  </Container>
);

export default IndexPage;
