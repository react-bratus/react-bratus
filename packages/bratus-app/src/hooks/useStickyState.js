import { useEffect, useState } from 'react';

// Sticky, as it saves the key-value pairs in local storage.
const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    // getItem() returns the value associated with the given key
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    // Set the new value in local storage.
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useStickyState;
