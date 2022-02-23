import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import MenuTitle from '../../atoms/MenuTitle';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const NavigationSection = ({ children, title }) => {
  return (
    <Section>
      <MenuTitle>{title}</MenuTitle>
      {children}
    </Section>
  );
};
NavigationSection.propTypes = {
  title: PropTypes.string,
};
export default NavigationSection;
