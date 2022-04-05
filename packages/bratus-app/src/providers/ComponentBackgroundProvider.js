import React from 'react';
import ComponentBackgroundContext from '../contexts/ComponentBackgroundContext';
import useStickyState from '../hooks/useStickyState';

const ComponentBackgroundProvider = ({ children }) => {
  const [componentBackground, setComponentBackground] = useStickyState(
    {
      mode: 'white',
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
