import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import dagre from 'dagre';
import React, { useEffect, useState } from 'react';
import ReactFlow, { isNode } from 'react-flow-renderer';
import styled from 'styled-components';

import useLocale from './hooks/useLocale';
import I18nWatchLocaleProvider from './providers/I18nWatchLocaleProvider';
import ThemeProvider from './providers/ThemeProvider';
import { activate } from './utils';
const App = () => {
  const { locale } = useLocale();
  const [elements, setElements] = useState(null);

  const StyledDiv = styled.div`
    height: 100vh;
  `;
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // In order to keep this example simple the node width and height are hardcoded.
  // In a real world app you would use the correct width and height values of
  // const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

  const nodeWidth = 172;
  const nodeHeight = 36;
  const getLayoutedElements = (elements, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    elements.forEach((el) => {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    });

    dagre.layout(dagreGraph);

    return elements.map((el) => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = isHorizontal ? 'left' : 'top';
        el.sourcePosition = isHorizontal ? 'right' : 'bottom';

        // unfortunately we need this little hack to pass a slighltiy different position
        // to notify react flow about the change. More over we are shifting the dagre node position
        // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }

      return el;
    });
  };

  useEffect(() => {
    activate(locale);
    fetch('http://localhost:3000/data')
      .then((res) => res.json())
      .then((data) => {
        setElements(getLayoutedElements([].concat(data.nodes, data.edges)));
      })
      .catch(console.log);
  }, [locale]);
  return (
    <I18nProvider i18n={i18n}>
      <I18nWatchLocaleProvider>
        <ThemeProvider>
          <StyledDiv>
            {elements && (
              <ReactFlow elements={elements} connectionLineType="smoothstep" />
            )}
          </StyledDiv>
        </ThemeProvider>
      </I18nWatchLocaleProvider>
    </I18nProvider>
  );
};

export default App;
