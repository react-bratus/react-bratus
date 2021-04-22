export const getParsedData = () => {
  return fetch('http://localhost:4444/parsedData').then((res) => res.json());
};

export const recompile = () => {
  return fetch('http://localhost:4444/compile', {
    method: 'POST',
  });
};
