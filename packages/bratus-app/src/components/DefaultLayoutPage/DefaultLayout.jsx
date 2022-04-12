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

const DefaultLayout = ({
  children,
  info,
  nodeDetail,
  setNodeDetail,
  verticalTreeLayoutAsDefault,
  setVerticalTreeLayoutAsDefault,
}) => {
  const [hideHelpOnStartUp, setHideHelpOnStartUp] = useStickyState(
    false,
    'react-bratus:hide-help'
  );
  const { highlightedComponents } = useContext(HighlightedComponentsContext);
  const [isHelpVisible, setIsHelpVisible] = useState(
    !hideHelpOnStartUp ? true : false
  );
  const [collapsed, setCollapsed] = useState(false);
  const [isMinimapVisible, setisMinimapVisible] = useState(true);

  const isMinimapNodeHighlighted = (node) => {
    return highlightedComponents.some((component) =>
      node.id.match(
        `${component.componentName}:+.+|${component.componentName}$`
      )
    );
  };

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
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          info={info}
        />

        <NavigationTriggerButton
          collapsed={collapsed}
          icon={<LeftCircleOutlined rotate={collapsed && 180} />}
          type="primary"
          shape="round"
          size="middle"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <span>Show Nav</span> : <span>Hide Nav</span>}
        </NavigationTriggerButton>

        <MainContentWrapper collapsed={collapsed}>
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
          {isMinimapVisible ? <span>Hide Map</span> : <span>Show Map</span>}
        </MinimapTriggerButton>
        {isMinimapVisible && (
          <StyledMiniMap nodeColor={defineMinimapNodeColor} />
        )}
      </ReactFlowProvider>

      <ReactFlowProvider>
        <HelpPanel
          verticalTreeLayoutAsDefault={verticalTreeLayoutAsDefault}
          setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
          isHelpVisible={isHelpVisible}
          setIsHelpVisible={setIsHelpVisible}
          hideHelpOnStartUp={hideHelpOnStartUp}
          setHideHelpOnStartUp={setHideHelpOnStartUp}
        />
      </ReactFlowProvider>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  verticalTreeLayoutAsDefault: PropTypes.any,
  setVerticalTreeLayoutAsDefault: PropTypes.any,
  info: PropTypes.any,
  nodeDetail: PropTypes.any,
  setNodeDetail: PropTypes.func,
};
export default DefaultLayout;
