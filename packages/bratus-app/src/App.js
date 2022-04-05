import 'antd/dist/antd.css';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Alert, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getParsedData } from './api';
import ComponentTree from './components/ComponentTree/ComponentTree';
import DefaultLayout from './components/DefaultLayoutPage/DefaultLayout';
import useLocale from './hooks/useLocale';
import HighlightedComponentsProvider from './providers/HighlightedComponentsProvider';
import I18nWatchLocaleProvider from './providers/I18nWatchLocaleProvider';
import ThemeProvider from './providers/ThemeProvider';
import { activate } from './utils/functions';
import { getEdges, getNodes } from './utils/functions/nodes-and-edges';
import { getLayoutedGraphElements } from './utils/functions/graphUtils';
import { GraphLabels } from './utils/tokens/constants';
import ComponentBackgroundContext from './contexts/ComponentBackgroundContext';

const App = () => {
  const { locale } = useLocale();
  const [nodesAndEdges, setNodesAndEdges] = useState(null);
  const [nodeDetail, setNodeDetail] = useState({ visible: false, node: null });
  const [info, setInfo] = useState(null);
  const [treeLayoutDirection, setTreeLayoutDirection] = useState(undefined);
  const { componentBackground } = useContext(ComponentBackgroundContext);

  useEffect(() => {
    activate(locale);
    /**
     * @param data is a set of nodes and edges: {nodes: Array, edges: Array}
     */
    getParsedData()
      .then((data) => {
        setInfo(data.info);
        const nodes = getNodes(data, setNodeDetail);
        const edges = getEdges(data);
        let tree = [];

        setNodesAndEdges(
          getLayoutedGraphElements(
            tree.concat(nodes, edges),
            GraphLabels.topToBottom,
            setTreeLayoutDirection,
            componentBackground
          )
        );
      })
      .catch(console.log);
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <I18nWatchLocaleProvider>
        <ThemeProvider>
          <HighlightedComponentsProvider>
            <DefaultLayout
              info={info}
              nodeDetail={nodeDetail}
              setNodeDetail={setNodeDetail}
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
          </HighlightedComponentsProvider>
        </ThemeProvider>
      </I18nWatchLocaleProvider>
    </I18nProvider>
  );
};

export default App;
