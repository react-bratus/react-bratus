import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

import Navigation from '../../molecules/Navigation';
import { navigationWidth } from '../../tokens/units';
const ContentWrapper = styled(Layout)`
  margin-left: ${navigationWidth}px;
  padding: 1rem;
  height: 100vh;
`;
const DefaultLayout = ({ children }) => {
  return (
    <Layout>
      <Navigation />
      <ContentWrapper>{children}</ContentWrapper>
    </Layout>
  );
};
export default DefaultLayout;
