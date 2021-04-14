import { Layout } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Navigation from '../../molecules/Navigation';
import { navigationWidth } from '../../tokens/units';
const ContentWrapper = styled(Layout)`
  margin-left: ${navigationWidth}px;
  padding: 1rem;
  height: 100vh;
`;
const DefaultLayout = ({ children, info }) => {
  return (
    <Layout>
      <Navigation info={info} />
      <ContentWrapper>{children}</ContentWrapper>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  info: PropTypes.any,
};
export default DefaultLayout;
