import React from 'react';
import ComponentBackgroundProvider from './ComponentBackgroundProvider';
import HighlightedComponentsProvider from './HighlightedComponentsProvider';

const Providers = ({ children }: any) => {
  return (
    <HighlightedComponentsProvider>
      <ComponentBackgroundProvider>{children}</ComponentBackgroundProvider>
    </HighlightedComponentsProvider>
  );
};

export default Providers;
