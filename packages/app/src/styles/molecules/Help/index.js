import { Divider, Drawer, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactFlow, { useZoomPanHelper } from 'react-flow-renderer';
import styled from 'styled-components';

import HighlightedComponentsContext from '../../../contexts/HighlightedComponentsContext';
import { getLayoutedElements } from '../../../utils/graphUtils';
import ComponentNode from '../../atoms/ComponentNode';

const Wrapper = styled.div`
  width: 600px;
  height: 700px;
`;
const { Title, Paragraph, Link } = Typography;

const Help = ({
  isHelpVisible,
  hideHelpOnStartUp,
  setIsHelpVisible,
  setHideHelpOnStartUp,
}) => {
  const { setCenter } = useZoomPanHelper();
  const [ellipsis] = useState(true);
  const { highlightedComponent, setHighlightedComponent } = useContext(
    HighlightedComponentsContext
  );
  const highlightComponent = (node, lock) => {
    const componentName = node ? node.data.label : null;
    if (lock) {
      setHighlightedComponent({
        componentName: componentName,
        locked: lock,
      });
    } else if (!highlightedComponent.locked) {
      setHighlightedComponent({
        componentName: componentName,
        locked: highlightedComponent.locked,
      });
    }
  };
  const resetHighlight = () => {
    if (!highlightedComponent.locked) {
      setHighlightedComponent({ componentName: null, locked: false });
    }
  };

  useEffect(() => setCenter(350, 350, 0.7));
  return (
    <Drawer
      width={720}
      onClose={() => setIsHelpVisible(false)}
      visible={isHelpVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Title level={3}>Thank you for installing react-bratus</Title>

      <Paragraph>
        Hopefully this tool can help you navigate your React.js code base. Below
        this paragraph you can find the elements that are displayed and what
        they represent.
      </Paragraph>
      <Paragraph>
        You can always click the Help button in navigation pane on the right to
        see this window again.
      </Paragraph>
      <Paragraph>
        I hope that you have time to give me feedback. Any feature ideas,
        constructive criticism, or bugs are welcomed in the{' '}
        <Link href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D">
          GitHub repository.
        </Link>
      </Paragraph>
      <Checkbox
        checked={hideHelpOnStartUp}
        onChange={(e) => setHideHelpOnStartUp(e.target.checked)}
      >
        {"Don't show me this again"}
      </Checkbox>

      <Divider />
      <Title>Changelog</Title>
      <Paragraph
        ellipsis={
          ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false
        }
      >
        - <b>2.0.3</b> <br />
        - Added posibility to set options in `.bratusrc.json` file
        <br />
        - Handle multiple components - Highlight components feature <br />
        - Lock highlighted component and move component including descendants at
        the same time <br />
        - CLI command -c --compile has been changed to -p --parse <br />-{' '}
        <b>2.0.2</b> <br />- First release
      </Paragraph>

      <Divider />
      <Title level={3}>Legend</Title>
      <Wrapper>
        <ReactFlow
          elements={getLayoutedElements(ELEMENTS)}
          nodeTypes={{ reactComponent: ComponentNode }}
          onNodeMouseEnter={(_e, node) => highlightComponent(node, false)}
          onNodeMouseLeave={resetHighlight}
          onElementClick={(_e, node) => highlightComponent(node, true)}
          onPaneClick={() =>
            setHighlightedComponent({ componentName: null, locked: false })
          }
        />
      </Wrapper>
    </Drawer>
  );
};

const ELEMENTS = [
  {
    id: 'node-1',
    type: 'reactComponent',
    data: {
      label: 'I am a component',
      component: { timesUsed: 1 },
      linesOfCode: 1,
      outDegree: 1,
      inDegree: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-2',
    type: 'reactComponent',
    data: {
      label: 'Solid connections denote components that are rendered by default',
      component: { timesUsed: 1 },
      linesOfCode: 80,
      outDegree: 0,
      inDegree: 1,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-3',
    type: 'reactComponent',
    data: {
      label: 'My height is proportional to how many lines of code I have.',
      component: { timesUsed: 1 },
      linesOfCode: 120,
      outDegree: 1,
      inDegree: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-4',
    type: 'reactComponent',
    data: {
      label: 'Blue dashed connections denote a Route.',
      component: { timesUsed: 1 },
      linesOfCode: 120,
      outDegree: 0,
      inDegree: 1,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-5',
    type: 'reactComponent',
    data: {
      label: 'This is how many times I have been used ->',
      component: { timesUsed: 6 },
      linesOfCode: 40,
      outDegree: 1,
      inDegree: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-6',
    type: 'reactComponent',
    data: {
      label:
        'Black dashed connection denote a component rendered within an if-statement',
      component: { timesUsed: 1 },
      linesOfCode: 240,
      outDegree: 0,
      inDegree: 1,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'node-7',
    type: 'reactComponent',
    data: {
      label: 'Hover me to highlight',
      component: { timesUsed: 1 },
      linesOfCode: 10,
      outDegree: 0,
      inDegree: 0,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-2',
  },
  {
    id: 'edge-2',
    source: 'node-3',
    target: 'node-4',
    label: '/route_to_rendered_component',
    animated: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: {
      fill: '#001529',
      fillOpacity: 0.7,
    },
    labelStyle: { fill: '#fff' },
    style: { stroke: '#00D8FF' },
  },
  {
    id: 'edge-3',
    source: 'node-5',
    target: 'node-6',
    animated: true,
  },
];

Help.propTypes = {
  isHelpVisible: PropTypes.bool,
  hideHelpOnStartUp: PropTypes.bool,
  setIsHelpVisible: PropTypes.func,
  setHideHelpOnStartUp: PropTypes.func,
};

export default Help;
