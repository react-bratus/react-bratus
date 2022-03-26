import {
  faGripHorizontal,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  LayoutButton,
  LayoutButtonsWrapper,
  StyledFontAwesomeIcon,
} from '../ComponentTree.sc';
import { getLayoutedGraphElements } from '../../../utils/functions/graphUtils';
import { ReactFlowProvider, useZoomPanHelper } from 'react-flow-renderer';

export const LayoutButtons = ({
  elements,
  setElements,
  setTreeLayoutDirection,
}) => {
  const reactFlowInstance = useZoomPanHelper();

  const onChangeTreeLayout = useCallback(
    (treeLayoutDirection) => {
      const layoutedElements = getLayoutedGraphElements(
        elements,
        treeLayoutDirection,
        setTreeLayoutDirection
      );
      setElements(layoutedElements);
    },
    [elements]
  );

  return (
    <ReactFlowProvider>
      <LayoutButtonsWrapper>
        <LayoutButton
          shape="round"
          type="primary"
          size="large"
          onClick={() => {
            onChangeTreeLayout('TB');
            reactFlowInstance.fitView();
          }}
        >
          Horizontal Layout
          <StyledFontAwesomeIcon icon={faGripHorizontal} />
        </LayoutButton>
        <LayoutButton
          shape="round"
          type="primary"
          size="large"
          onClick={() => {
            onChangeTreeLayout('LR');
            reactFlowInstance.fitView();
          }}
        >
          Vertical Layout
          <StyledFontAwesomeIcon icon={faGripVertical} />
        </LayoutButton>
      </LayoutButtonsWrapper>
    </ReactFlowProvider>
  );
};

export default LayoutButtons;

LayoutButtons.propTypes = {
  elements: PropTypes.any,
  setElements: PropTypes.any,
  setTreeLayoutDirection: PropTypes.any,
};
