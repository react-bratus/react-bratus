import { createContext } from 'react';
import { BackgroundLabels } from '../utils/constants/constants';

const ComponentBackgroundContext = createContext({
  mode: BackgroundLabels.white,
  locReference: 300,
});

export default ComponentBackgroundContext;
