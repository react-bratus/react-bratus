import {
  faGripHorizontal,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  LayoutButton,
  LayoutButtonsWrapper,
  StyledFontAwesomeIcon,
} from '../ComponentTree.sc';
import { getLayoutedGraphElements } from '../../../utils/functions/graphUtils';
import { useZoomPanHelper } from 'react-flow-renderer';
import ComponentBackgroundContext from '../../../contexts/ComponentBackgroundContext';

export const LayoutButtons = ({
  layoutedNodesAndEdges,
  setLayoutedNodesAndEdges,
  setTreeLayoutDirection,
}) => {
  const reactFlowInstance = useZoomPanHelper();

  const { componentBackground } = useContext(ComponentBackgroundContext);

  const onChangeTreeLayout = useCallback(
    (treeLayoutDirection) => {
      const els = getLayoutedGraphElements(
        layoutedNodesAndEdges,
        treeLayoutDirection,
        setTreeLayoutDirection,
        componentBackground
      );
      setLayoutedNodesAndEdges(els);
    },
    [layoutedNodesAndEdges]
  );

  return (
    <LayoutButtonsWrapper>
      <LayoutButton
        shape="round"
        type="primary"
        size="middle"
        onClick={async () => {
          await onChangeTreeLayout('TB');
          reactFlowInstance.fitView();
        }}
      >
        Horizontal Layout
        <StyledFontAwesomeIcon icon={faGripHorizontal} />
      </LayoutButton>

      <LayoutButton
        shape="round"
        type="primary"
        size="middle"
        onClick={async () => {
          await onChangeTreeLayout('LR');
          reactFlowInstance.fitView();
        }}
      >
        Vertical Layout
        <StyledFontAwesomeIcon icon={faGripVertical} />
      </LayoutButton>
    </LayoutButtonsWrapper>
  );
};

export default LayoutButtons;

LayoutButtons.propTypes = {
  layoutedNodesAndEdges: PropTypes.any,
  setLayoutedNodesAndEdges: PropTypes.any,
  setTreeLayoutDirection: PropTypes.any,
};
