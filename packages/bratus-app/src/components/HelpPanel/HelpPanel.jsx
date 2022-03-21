import { Divider, Drawer, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ReactFlow from 'react-flow-renderer';

import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
// import { getLayoutedElements } from '../../utils/functions/graphUtils';
// import { GraphLabels } from '../../utils/tokens/constants';
import ComponentNode from '../ComponentNode/ComponentNode';
// import { Elements } from './HelpPanel.mock-data';
import { HelpPanelTreeWrapper } from './HelpPanel.sc';
const { Title, Paragraph, Link } = Typography;

const HelpPanel = ({
  isHelpVisible,
  hideHelpOnStartUp,
  setIsHelpVisible,
  setHideHelpOnStartUp,
}) => {
  const { highlightedComponents, setHighlightedComponents } = useContext(
    HighlightedComponentsContext
  );
  const [ellipsis] = useState(true);
  const highlightComponent = (node) => {
    const componentName = node ? node.data.label : null;
    setHighlightedComponents([
      ...highlightedComponents.filter((_node) => _node.locked),
      {
        id: node.id,
        componentName: componentName,
        locked: false,
        search: false,
      },
    ]);
  };

  const removeHighlight = (node) => {
    const index = highlightedComponents.findIndex(
      (component) => component.id === node.id
    );
    if (index !== -1) {
      const highlightedComponent = highlightedComponents[index];
      if (!highlightedComponent.locked) {
        const array = [...highlightedComponents];
        array.splice(index, 1);
        setHighlightedComponents(array);
      }
    }
  };

  const resetHighlight = () => setHighlightedComponents([]);
  return (
    <Drawer
      width={720}
      onClose={() => setIsHelpVisible(false)}
      visible={isHelpVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Title level={3}>Legend</Title>

      <Paragraph>
        Below this paragraph you can find the elements that are displayed and
        what they represent.
      </Paragraph>

      <HelpPanelTreeWrapper>
        <ReactFlow
          // elements={getLayoutedElements(Elements, GraphLabels.leftToRight)}
          nodeTypes={{ reactComponent: ComponentNode }}
          onNodeMouseEnter={(_e, node) => highlightComponent(node)}
          onNodeMouseLeave={(_e, node) => removeHighlight(node)}
          onElementClick={(_e, node) => highlightComponent(node)}
          onPaneClick={() => resetHighlight()}
          defaultPosition={[150, 0]}
          defaultZoom={0.5}
        />
      </HelpPanelTreeWrapper>

      <Divider />

      <Title level={5}>Thank you for installing react-bratus</Title>

      <Paragraph>
        Hopefully this tool can help you navigate your React.js code base.
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

      <Title level={5}>Changelog</Title>

      <Paragraph
        ellipsis={
          ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false
        }
      >
        - <b>2.0.7</b> <br />
        - Bug fix
        <br />- <b>2.0.6</b> <br />- Configurable component backgrounds <br />
        - Improved logging <br />- <b>2.0.5</b> <br />
        - Throws error if a circular reference is found
        <br />
        - Minor bug fixes
        <br />
        - Updated README
        <br />- <b>2.0.4</b> <br />
        - Added TreeSearch <br />- Colored components based on the label hash
        <br /> - Added lock icon. Possibility to lock multiple components <br />{' '}
        - Added eye icon. Possibility to open details about component. <br /> -
        Details page showing the path <br />- Clicking on path will open vscode{' '}
        <br /> - Details page showing the code <br /> - Fixed some bugs <br /> -
        CLI automatically opens browser when react-bratus is started <br />-
        Size of MiniMap increased <br />- <b>2.0.3</b> <br />
        - Added posibility to set options in `.bratusrc.json` file
        <br />
        - Handle multiple components - Highlight components feature <br />
        - Lock highlighted component and move component including descendants at
        the same time <br />
        - CLI command -c --compile has been changed to -p --parse <br />-{' '}
        Removed Info section <br />
        <b>2.0.2</b> <br />- First release
      </Paragraph>

      <Divider />
    </Drawer>
  );
};

HelpPanel.propTypes = {
  isHelpVisible: PropTypes.bool,
  hideHelpOnStartUp: PropTypes.bool,
  setIsHelpVisible: PropTypes.func,
  setHideHelpOnStartUp: PropTypes.func,
};

export default HelpPanel;
