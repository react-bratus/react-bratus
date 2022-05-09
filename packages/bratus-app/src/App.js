import 'antd/dist/antd.css';
import { Alert, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getParsedData } from './api';
import ComponentTree from './components/ComponentTree/ComponentTree';
import DefaultLayout from './components/DefaultLayoutPage/DefaultLayout';
import { getEdges, getNodes } from './utils/functions/nodes-and-edges';
import { getLayoutedGraphElements } from './utils/functions/graphUtils';
import { GraphLabels } from './utils/constants/constants';
import ComponentBackgroundContext from './contexts/ComponentBackgroundContext';
import useStickyState from './hooks/useStickyState';

const App = () => {
  const [nodesAndEdges, setNodesAndEdges] = useState(null);
  const [nodeDetail, setNodeDetail] = useState({ visible: false, node: null });
  const { componentBackground } = useContext(ComponentBackgroundContext);

  const [treeLayoutDirection, setTreeLayoutDirection] = useState(undefined);

  // Set vertical as default through the help panel preferences section.
  const [isVerticalTreeLayoutAsDefault, setVerticalTreeLayoutAsDefault] =
    useStickyState(false, 'bratus:prefer-vertical-layout');

  const treeLayoutOnCompile =
    isVerticalTreeLayoutAsDefault === true
      ? GraphLabels.leftToRight
      : GraphLabels.topToBottom;

  useEffect(() => {
    getParsedData()
      // data comes as a set of nodes and edges from the server.
      .then((data) => {
        const nodes = getNodes(data, setNodeDetail);
        const edges = getEdges(data);
        let tree = [];

        setNodesAndEdges(
          getLayoutedGraphElements(
            tree.concat(nodes, edges),
            treeLayoutOnCompile,
            setTreeLayoutDirection,
            componentBackground
          )
        );
      })
      .catch(console.log);
  }, []);

  return (
    <DefaultLayout
      nodeDetail={nodeDetail}
      setNodeDetail={setNodeDetail}
      isVerticalTreeLayoutAsDefault={isVerticalTreeLayoutAsDefault}
      setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
    >
      {nodesAndEdges ? (
        <ComponentTree
          treeLayoutDirection={treeLayoutDirection}
          nodesAndEdges={nodesAndEdges}
          setTreeLayoutDirection={setTreeLayoutDirection}
        />
      ) : (
        <Spin spinning={true}>
          <Alert
            message="Nothing to show"
            description="Could not find any components to display"
            type="warning"
          />
        </Spin>
      )}
    </DefaultLayout>
  );
};

export default App;
