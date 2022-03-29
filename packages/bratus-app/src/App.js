import 'antd/dist/antd.css';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { getParsedData } from './api';
import ComponentTree from './components/ComponentTree/ComponentTree';
import DefaultLayout from './components/DefaultLayoutPage/DefaultLayout';
import useLocale from './hooks/useLocale';
import ComponentBackgroundProvider from './providers/ComponentBackgroundProvider';
import HighlightedComponentsProvider from './providers/HighlightedComponentsProvider';
import I18nWatchLocaleProvider from './providers/I18nWatchLocaleProvider';
import ThemeProvider from './providers/ThemeProvider';
import { activate } from './utils/functions';

import { getEdges, getNodes } from './utils/functions/nodes-and-edges';
import { getLayoutedGraphElements } from './utils/functions/graphUtils';
import { GraphLabels } from './utils/tokens/constants';

const App = () => {
  const { locale } = useLocale();
  const [nodesAndEdges, setNodesAndEdges] = useState(null);
  const [nodeDetail, setNodeDetail] = useState({ visible: false, node: null });
  const [info, setInfo] = useState(null);
  const [treeLayoutDirection, setTreeLayoutDirection] = useState(undefined);

  useEffect(() => {
    activate(locale);
    /**
     * @param data is a set of nodes and edges: {nodes: Array, edges: Array}
     * @param data.nodes returns an array of nodes which have the information below:
     * {position: {x: 0, y: 0}, type: "reactComponent", id: "App", data: Object}
     * @param data.edges returns an array of edges which have the information below:
     * {id: "App:FilteredProducts:Header", source: "App:FilteredProducts", target: "App:FilteredProducts:Header", animated: false}
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
            setTreeLayoutDirection
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
            <ComponentBackgroundProvider>
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
            </ComponentBackgroundProvider>
          </HighlightedComponentsProvider>
        </ThemeProvider>
      </I18nWatchLocaleProvider>
    </I18nProvider>
  );
};

export default App;
