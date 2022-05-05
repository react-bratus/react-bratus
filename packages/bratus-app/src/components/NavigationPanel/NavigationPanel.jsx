import { Menu } from 'antd';
import React, { useEffect } from 'react';
import { navigationWidth } from '../../utils/constants/units';
import {
  AppTitle,
  NavigationSider,
  StyledMenuDivider,
  StyledSubMenu,
} from './NavigationPanel.sc';
import PropTypes from 'prop-types';
import {
  BgColorsOutlined,
  FileSearchOutlined,
  GithubOutlined,
  InteractionOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import NavigationPrimaryActions from './private/ActionButtons/NavigationPrimaryActions';
import NavigationGitHubActions from './private/ActionButtons/NavigationGitHubActions';
import NavExperimentalActions from './private/Experimental/NavExperimentalActions';
import NavSearchComponent from './private/SubMenuSections/NavSearchComponent';
import NavNodeVisualizationOptions from './private/SubMenuSections/NavNodeVisualizationOptions';
import {
  defaultOpenKeys,
  NavigationLabels,
} from '../../utils/constants/constants';
import { useZoomPanHelper } from 'react-flow-renderer';

const NavigationPanel = ({
  isNavCollapsed,
  setIsHelpVisible,
  setComponentLabelFilter,
}) => {
  const reactFlowInstance = useZoomPanHelper();

  useEffect(() => {
    setTimeout(() => {
      reactFlowInstance.fitView({ duration: 700 });
    }, 0);
  }, [isNavCollapsed]);

  return (
    <>
      <NavigationSider
        collapsed={isNavCollapsed}
        collapsedWidth={0}
        width={navigationWidth}
      >
        <AppTitle level={1}>{NavigationLabels.title}</AppTitle>

        <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys}>
          <StyledSubMenu
            key={NavigationLabels.search.key}
            title={NavigationLabels.search.title}
            icon={<FileSearchOutlined />}
          >
            <NavSearchComponent
              setComponentLabelFilter={setComponentLabelFilter}
            />
          </StyledSubMenu>

          <StyledMenuDivider />

          <StyledSubMenu
            key={NavigationLabels.node.key}
            title={NavigationLabels.node.title}
            icon={<BgColorsOutlined />}
          >
            <NavNodeVisualizationOptions />
          </StyledSubMenu>

          <StyledMenuDivider />

          <StyledSubMenu
            key={NavigationLabels.actions.key}
            title={NavigationLabels.actions.title}
            icon={<InteractionOutlined />}
          >
            <NavigationPrimaryActions setIsHelpVisible={setIsHelpVisible} />
            <StyledSubMenu
              key={NavigationLabels.github.key}
              title={NavigationLabels.github.title}
              icon={<GithubOutlined />}
            >
              <NavigationGitHubActions />
            </StyledSubMenu>
          </StyledSubMenu>

          <StyledMenuDivider />
          <StyledSubMenu
            key={'experimental-actions'}
            title={'Experimental actions'}
            icon={<ExperimentOutlined />}
          >
            <NavExperimentalActions />
          </StyledSubMenu>
        </Menu>
      </NavigationSider>
    </>
  );
};

NavigationPanel.propTypes = {
  isNavCollapsed: PropTypes.any,
  setIsHelpVisible: PropTypes.any,
  setComponentLabelFilter: PropTypes.func,
};

export default NavigationPanel;
