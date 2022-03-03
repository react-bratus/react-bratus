import { QuestionCircleOutlined } from '@ant-design/icons';
import { Drawer as ComponentDetailsDrawer, Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';

import useStickyState from '../../hooks/useStickyState';
import ComponentDetails from '../ComponentDetails/ComponentDetails';
import HelpPanel from '../HelpPanel/HelpPanel';
import Navigation from '../NavigationPanel/NavigationPanel';
import { HelpPanelButton, MainContentWrapper } from './DefaultLayout.sc';

const DefaultLayout = ({ children, info, nodeDetail, setNodeDetail }) => {
  const [hideHelpOnStartUp, setHideHelpOnStartUp] = useStickyState(
    false,
    'react-bratus:hide-help'
  );

  const [isHelpVisible, setIsHelpVisible] = useState(
    !hideHelpOnStartUp ? true : false
  );

  return (
    <Layout>
      <ReactFlowProvider>
        <Navigation info={info} />

        <MainContentWrapper>{children}</MainContentWrapper>

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
          isHelpVisible={isHelpVisible}
          setIsHelpVisible={setIsHelpVisible}
          hideHelpOnStartUp={hideHelpOnStartUp}
          setHideHelpOnStartUp={setHideHelpOnStartUp}
        />
      </ReactFlowProvider>

      <HelpPanelButton
        type="primary"
        shape={'round'}
        size="large"
        icon={<QuestionCircleOutlined />}
        onClick={() => setIsHelpVisible(true)}
      >
        Open help
      </HelpPanelButton>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  info: PropTypes.any,
  nodeDetail: PropTypes.any,
  setNodeDetail: PropTypes.func,
};
export default DefaultLayout;
