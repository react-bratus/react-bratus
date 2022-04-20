export const getParsedData = () => {
  return fetch('http://localhost:4444/parsedData').then((res) => res.json());
};

export const recompile = () => {
  return fetch('http://localhost:4444/recompile', {
    method: 'POST',
  });
};

export const makeConfiguration = (customRootComponenets) => {
  return fetch('http://localhost:4444/makeConfiguration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rootComponents: customRootComponenets }),
  });
};
