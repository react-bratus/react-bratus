import { LeftCircleOutlined } from '@ant-design/icons';
import { Drawer as ComponentDetailsDrawer, Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import useStickyState from '../../hooks/useStickyState';
import ComponentDetails from '../ComponentDetails/ComponentDetails';
import HelpPanel from '../HelpPanel/HelpPanel';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
import {
  MainContentWrapper,
  NavigationTriggerButton,
} from './DefaultLayout.sc';

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

  const [isHelpVisible, setIsHelpVisible] = useState(
    !hideHelpOnStartUp ? true : false
  );

  const [collapsed, setCollapsed] = useState(false);

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
          size="large"
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
