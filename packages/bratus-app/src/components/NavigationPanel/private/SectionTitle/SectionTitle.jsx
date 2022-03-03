import React from 'react';

import {
  SectionDivider,
  SectionTitleWrapper,
  StyledSectionTitle,
} from './SectionTitle.sc';

// Associated with the Sidebar. Returns the title of every
// section and the divider line between sections

const SectionTitle = ({ children }) => {
  return (
    <SectionTitleWrapper>
      <StyledSectionTitle>{children}</StyledSectionTitle>

      <SectionDivider />
    </SectionTitleWrapper>
  );
};

export default SectionTitle;
