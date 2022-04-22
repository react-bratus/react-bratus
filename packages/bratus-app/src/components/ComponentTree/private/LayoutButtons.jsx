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
import { ButtonLabels, GraphLabels } from '../../../utils/constants/constants';

export const LayoutButtons = ({
  layoutedNodesAndEdges,
  setLayoutedNodesAndEdges,
  setTreeLayoutDirection,
}) => {
  // Get the instance of the tree, so that we can use .fitView().
  const reactFlowInstance = useZoomPanHelper();

  const { componentBackground } = useContext(ComponentBackgroundContext);

  // Change the layout of the tree on button click.
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
        onClick={() => {
          onChangeTreeLayout(GraphLabels.topToBottom);
          setTimeout(() => reactFlowInstance.fitView(), 0);
        }}
      >
        {ButtonLabels.horizontal}
        <StyledFontAwesomeIcon icon={faGripHorizontal} />
      </LayoutButton>

      <LayoutButton
        shape="round"
        type="primary"
        size="middle"
        onClick={() => {
          onChangeTreeLayout(GraphLabels.leftToRight);
          setTimeout(() => reactFlowInstance.fitView(), 0);
        }}
      >
        {ButtonLabels.vertical}
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
