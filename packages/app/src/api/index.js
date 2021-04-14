export const getParsedData = () => {
  return fetch('http://localhost:3000/parsedData').then((res) => res.json());
};

export const recompile = () => {
  return fetch('http://localhost:3000/compile', {
    method: 'POST',
  });
};
