import { useState } from 'react';

import { getUserLocale } from '../utils';

const LOCAL_STORAGE_KEY = 'react-bratus:settings:locale';

const useLocale = () => {
  const [locale, setLocale] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? getUserLocale()
  );

  const updateLocale = (value) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
    setLocale(value);
  };

  return { locale, updateLocale };
};

export default useLocale;
