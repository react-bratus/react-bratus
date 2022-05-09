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

// Preserving the initial nodes to display them in the dropdowns even after filtering.
export const InitialNodesContext = React.createContext([]);

const App = () => {
  const [nodesAndEdges, setNodesAndEdges] = useState(null);

  // State for Drawer holding the code panel of the selected node..
  const [nodeDetail, setNodeDetail] = useState({ visible: false, node: null });

  // Storing initial nodes to assign them to InitialNodesContext
  const [initialNodes, setInitialNodes] = useState([]);

  // Node visualization options (size, color, white). See NavNodeVisualizationOptions.jsx
  const { componentBackground } = useContext(ComponentBackgroundContext);

  // Dropdown value that filters by component label (name) on click.
  const [componentLabelFilter, setComponentLabelFilter] = useState(null);

  // Input value that filers components by the number of 'timesUsed'
  const [componentNumberFilter, setComponentNumberFilter] = useState(null);

  // Inform the application about the tree direction at all times.
  const [treeLayoutDirection, setTreeLayoutDirection] = useState(undefined);

  // Enabling & disabling subtree mode.
  const [isSubtreeMode, setIsSubtreeMode] = useState(false);

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
        const nodes = getNodes(data, setNodeDetail, setInitialNodes);
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
    <InitialNodesContext.Provider value={initialNodes}>
      <DefaultLayout
        nodeDetail={nodeDetail}
        isSubtreeMode={isSubtreeMode}
        setIsSubtreeMode={setIsSubtreeMode}
        setComponentLabelFilter={setComponentLabelFilter}
        setComponentNumberFilter={setComponentNumberFilter}
        setNodeDetail={setNodeDetail}
        isVerticalTreeLayoutAsDefault={isVerticalTreeLayoutAsDefault}
        setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
      >
        {nodesAndEdges ? (
          <ComponentTree
            componentLabelFilter={componentLabelFilter}
            componentNumberFilter={componentNumberFilter}
            treeLayoutDirection={treeLayoutDirection}
            isSubtreeMode={isSubtreeMode}
            setIsSubtreeMode={setIsSubtreeMode}
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
    </InitialNodesContext.Provider>
  );
};

export default App;
