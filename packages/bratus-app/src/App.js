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
import { triggerBrowserWarning } from './utils/functions/browser-notification';

// Preserving the initial nodes to display them in the dropdowns even after filtering.
export const InitialNodesContext = React.createContext([]);
export const DraggableContent = React.createContext(false);

const App = () => {
  const [isDragging, setIsDragging] = useState(false);

  const [nodesAndEdges, setNodesAndEdges] = useState(null);

  // State for Drawer holding the code panel of the selected node..
  const [nodeDetail, setNodeDetail] = useState({ visible: false, node: null });

  // Storing initial nodes to assign them to InitialNodesContext
  const [initialNodes, setInitialNodes] = useState([]);

  // Node visualization options (size, color, green). See NavNodeVisualizationOptions.jsx
  const { componentBackground } = useContext(ComponentBackgroundContext);

  // Dropdown value that filters by component label (name) on click.
  const [componentLabelFilter, setComponentLabelFilter] = useState(null);

  // Input value that filers components by the number of 'timesUsed'
  const [componentNumberFilter, setComponentNumberFilter] = useState(null);

  // Input value that filers components by the number of 'timesUsed'
  const [componentNameFilter, setComponentNameFilter] = useState(null);

  // Inform the application about the tree direction at all times.
  const [treeLayoutDirection, setTreeLayoutDirection] = useState(undefined);

  // Enabling & disabling subtree mode.
  const [isFilterMode, setIsFilterMode] = useState(false);

  // Set vertical as default through the help panel preferences section.
  const [isVerticalTreeLayoutAsDefault, setVerticalTreeLayoutAsDefault] =
    useStickyState(false, 'bratus:prefer-vertical-layout');

  // Don't show browser warning again
  const [isBrowserWarningHidden, setIsBrowserWarningHidden] = useStickyState(
    false,
    'bratus:hidden-browser-warning'
  );

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

        triggerBrowserWarning(
          setIsBrowserWarningHidden,
          isBrowserWarningHidden
        );

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
        isFilterMode={isFilterMode}
        setIsFilterMode={setIsFilterMode}
        setComponentLabelFilter={setComponentLabelFilter}
        setComponentNumberFilter={setComponentNumberFilter}
        setComponentNameFilter={setComponentNameFilter}
        setNodeDetail={setNodeDetail}
        isVerticalTreeLayoutAsDefault={isVerticalTreeLayoutAsDefault}
        setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
      >
        {nodesAndEdges ? (
          <DraggableContent.Provider value={isDragging}>
            <ComponentTree
              componentLabelFilter={componentLabelFilter}
              componentNumberFilter={componentNumberFilter}
              componentNameFilter={componentNameFilter}
              treeLayoutDirection={treeLayoutDirection}
              isFilterMode={isFilterMode}
              setIsDragging={setIsDragging}
              setIsFilterMode={setIsFilterMode}
              nodesAndEdges={nodesAndEdges}
              setTreeLayoutDirection={setTreeLayoutDirection}
            />
          </DraggableContent.Provider>
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
