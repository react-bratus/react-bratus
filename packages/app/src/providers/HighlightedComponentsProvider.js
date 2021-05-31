import React, { useState } from 'react';

import HighlightedComponentsContext from '../contexts/HighlightedComponentsContext';

const HighlightedComponentsProvider = ({ children }) => {
  const [highlightedComponents, setHighlightedComponents] = useState([]);

  return (
    <HighlightedComponentsContext.Provider
      value={{ highlightedComponents, setHighlightedComponents }}
    >
      {children}
    </HighlightedComponentsContext.Provider>
  );
};

export default HighlightedComponentsProvider;
