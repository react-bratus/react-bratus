import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import styled from 'styled-components';

import useStickyState from '../../../hooks/useStickyState';
import Help from '../../molecules/Help';
import Navigation from '../../molecules/Navigation';
import NodeDetail from '../../molecules/NodeDetail';
import { baseUnit, navigationWidth } from '../../tokens/units';
const ContentWrapper = styled(Layout)`
  margin-left: ${navigationWidth}px;
  padding: 1rem;
  height: 100vh;
`;
const HelpButton = styled(Button)`
  position: absolute;
  bottom: ${baseUnit * 2}px;
  left: ${baseUnit * 2}px;
`;
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
        <ContentWrapper>{children}</ContentWrapper>
        <Drawer
          width={800}
          visible={nodeDetail.visible}
          closable={true}
          onClose={() => setNodeDetail({ visible: false, node: null })}
          title={nodeDetail.node ? nodeDetail.node.data.label : ''}
        >
          <NodeDetail nodeDetail={nodeDetail} />
        </Drawer>
      </ReactFlowProvider>
      <ReactFlowProvider>
        <Help
          isHelpVisible={isHelpVisible}
          setIsHelpVisible={setIsHelpVisible}
          hideHelpOnStartUp={hideHelpOnStartUp}
          setHideHelpOnStartUp={setHideHelpOnStartUp}
        />
      </ReactFlowProvider>
      <HelpButton
        type="primary"
        shape={'round'}
        size="large"
        icon={<QuestionCircleOutlined />}
        onClick={() => setIsHelpVisible(true)}
      >
        Open help
      </HelpButton>
    </Layout>
  );
};

DefaultLayout.propTypes = {
  info: PropTypes.any,
  nodeDetail: PropTypes.any,
  setNodeDetail: PropTypes.func,
};
export default DefaultLayout;
