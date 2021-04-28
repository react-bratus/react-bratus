import { createContext } from 'react';

const HighlightedComponentsContext = createContext({
  highlightedComponent: { componentName: null, locked: false },
});

export default HighlightedComponentsContext;
