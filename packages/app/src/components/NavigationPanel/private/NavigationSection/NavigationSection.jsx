import PropTypes from 'prop-types';
import React from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import { Section } from './NavigationSection.sc';

const NavigationSection = ({ title, children }) => {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Section>
  );
};
NavigationSection.propTypes = {
  title: PropTypes.string,
};
export default NavigationSection;
