import { LeftCircleOutlined } from '@ant-design/icons';
import ColorHash from 'color-hash';

import { Drawer as ComponentDetailsDrawer, Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import useStickyState from '../../hooks/useStickyState';
import ComponentDetails from '../ComponentDetails/ComponentDetails';
import HelpPanel from '../HelpPanel/HelpPanel';
import StyledMiniMap from '../Minimap/Minimap.sc';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
import {
  MainContentWrapper,
  MinimapTriggerButton,
  NavigationTriggerButton,
} from './DefaultLayout.sc';
import HighlightedComponentsContext from '../../contexts/HighlightedComponentsContext';
import { ButtonLabels } from '../../utils/constants/constants';

const DefaultLayout = ({
  children,
  nodeDetail,
  isSubtreeMode,
  setIsSubtreeMode,
  setNodeDetail,
  setComponentLabelFilter,
  setComponentNumberFilter,
  setComponentNameFilter,
  isVerticalTreeLayoutAsDefault,
  setVerticalTreeLayoutAsDefault,
}) => {
  // Set hidden help on start up to false in the local storage.
  const [isHelpHiddenOnStartUp, setIsHelpHiddenOnStartUp] = useStickyState(
    false,
    'react-bratus:hide-help'
  );

  // When user clicks the checkbox to hide or display help on startup.
  const [isHelpVisible, setIsHelpVisible] = useState(
    !isHelpHiddenOnStartUp ? true : false
  );

  // State to collapse the navigation sider.
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // State to hide/ show the minimap.
  const [isMinimapVisible, setisMinimapVisible] = useState(false);

  // Highlight the same nodes on minimap when hovering over the nodes of the tree.
  const { highlightedComponents } = useContext(HighlightedComponentsContext);
  const isMinimapNodeHighlighted = (node) => {
    return highlightedComponents.some((component) =>
      node.id.match(
        `${component.componentName}:+.+|${component.componentName}$`
      )
    );
  };

  // Color nodes on the minimap differently when highlighted or not.
  const defineMinimapNodeColor = (node) => {
    if (isMinimapNodeHighlighted(node)) {
      return new ColorHash({
        lightness: 0.4,
        hue: { min: 0, max: 366 },
      }).hex(node.data.label);
    } else {
      return new ColorHash({
        lightness: 0.7,
        hue: { min: 0, max: 366 },
      }).hex(node.data.label);
    }
  };

  return (
    <Layout>
      <ReactFlowProvider>
        <NavigationPanel
          setIsHelpVisible={setIsHelpVisible}
          setIsNavCollapsed={setIsNavCollapsed}
          isSubtreeMode={isSubtreeMode}
          setIsSubtreeMode={setIsSubtreeMode}
          isNavCollapsed={isNavCollapsed}
          setComponentLabelFilter={setComponentLabelFilter}
          setComponentNumberFilter={setComponentNumberFilter}
          setComponentNameFilter={setComponentNameFilter}
        />

        <NavigationTriggerButton
          isNavCollapsed={isNavCollapsed}
          icon={<LeftCircleOutlined rotate={isNavCollapsed && 180} />}
          type="primary"
          shape="round"
          size="middle"
          onClick={() => {
            setIsNavCollapsed(!isNavCollapsed);
          }}
        >
          {isNavCollapsed ? (
            <span>{ButtonLabels.nav.show}</span>
          ) : (
            <span>{ButtonLabels.nav.hide}</span>
          )}
        </NavigationTriggerButton>

        <MainContentWrapper isNavCollapsed={isNavCollapsed}>
          {children}
        </MainContentWrapper>

        <ComponentDetailsDrawer
          width={800}
          visible={nodeDetail.visible}
          closable={true}
          keyboard
          onClose={() => setNodeDetail({ visible: false, node: null })}
          title={nodeDetail.node ? nodeDetail.node.data.label : ''}
        >
          <ComponentDetails nodeDetail={nodeDetail} />
        </ComponentDetailsDrawer>

        <MinimapTriggerButton
          isMinimapVisible={isMinimapVisible}
          icon={<LeftCircleOutlined rotate={isMinimapVisible && 180} />}
          type="primary"
          shape="round"
          size="middle"
          onClick={() => {
            setisMinimapVisible(!isMinimapVisible);
          }}
        >
          {isMinimapVisible ? (
            <span>{ButtonLabels.map.hide}</span>
          ) : (
            <span>{ButtonLabels.map.show}</span>
          )}
        </MinimapTriggerButton>
        {isMinimapVisible && (
          <StyledMiniMap nodeColor={defineMinimapNodeColor} />
        )}
      </ReactFlowProvider>

      <ReactFlowProvider>
        <HelpPanel
          isVerticalTreeLayoutAsDefault={isVerticalTreeLayoutAsDefault}
          setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
          isHelpVisible={isHelpVisible}
          setIsHelpVisible={setIsHelpVisible}
          isHelpHiddenOnStartUp={isHelpHiddenOnStartUp}
          setIsHelpHiddenOnStartUp={setIsHelpHiddenOnStartUp}
        />
      </ReactFlowProvider>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  isVerticalTreeLayoutAsDefault: PropTypes.any,
  setVerticalTreeLayoutAsDefault: PropTypes.any,
  nodeDetail: PropTypes.any,
  setNodeDetail: PropTypes.func,
  setComponentLabelFilter: PropTypes.func,
  setComponentNumberFilter: PropTypes.func,
  setComponentNameFilter: PropTypes.func,
  isSubtreeMode: PropTypes.bool,
  setIsSubtreeMode: PropTypes.func,
};
export default DefaultLayout;
