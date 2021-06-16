import { createContext } from 'react';

const ComponentBackgroundContext = createContext({
  mode: 'white',
  locReference: 300,
});

export default ComponentBackgroundContext;
