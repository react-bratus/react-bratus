export const getParsedData = () => {
  return fetch('http://localhost:4444/parsedData').then((res) => res.json());
};

export const recompile = (input) => {
  console.log('[ASTParser] Recompiling...');
  return fetch('http://localhost:4444/compile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rootComponents: input }),
  });
};
