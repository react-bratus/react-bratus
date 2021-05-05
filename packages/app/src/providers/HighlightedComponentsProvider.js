import React, { useState } from 'react';

import HighlightedComponentsContext from '../contexts/HighlightedComponentsContext';

const HighlightedComponentsProvider = ({ children }) => {
  const [highlightedComponent, setHighlightedComponent] = useState({
    componentName: null,
    locked: false,
  });
  return (
    <HighlightedComponentsContext.Provider
      value={{ highlightedComponent, setHighlightedComponent }}
    >
      {children}
    </HighlightedComponentsContext.Provider>
  );
};

export default HighlightedComponentsProvider;
