import React from 'react';
import ComponentBackgroundContext from '../contexts/ComponentBackgroundContext';
import useStickyState from '../hooks/useStickyState';
import { BackgroundLabels } from '../utils/constants/constants';

const ComponentBackgroundProvider = ({ children }) => {
  const [componentBackground, setComponentBackground] = useStickyState(
    {
      mode: BackgroundLabels.default,
      locReference: 300,
    },
    'componentBackground'
  );

  return (
    <ComponentBackgroundContext.Provider
      value={{ componentBackground, setComponentBackground }}
    >
      {children}
    </ComponentBackgroundContext.Provider>
  );
};

export default ComponentBackgroundProvider;
