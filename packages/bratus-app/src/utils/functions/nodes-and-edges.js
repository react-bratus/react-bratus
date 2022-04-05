export const getNodes = (data, setNodeDetail) => {
  const nodes = data.nodes.map((node) => {
    return {
      ...node,
      data: {
        ...node.data,
        onShowNodeDetail: (node) =>
          setNodeDetail({ visible: true, node: node }),
      },
    };
  });

  return nodes;
};

export const getEdges = (data) => {
  const edges = data.edges.map((edge) => {
    return {
      ...edge,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: {
        fill: '#001529',
        fillOpacity: 0.7,
      },
      labelStyle: {
        fill: '#fff',
      },
      style: {
        stroke: edge.conditional ? 'green' : edge.label ? 'red' : '#000',
      },
    };
  });

  return edges;
};
