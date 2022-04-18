import { Menu } from 'antd';
import React from 'react';
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
} from '@ant-design/icons';
import NavigationPrimaryActions from './private/ActionButtons/NavigationPrimaryActions';
import NavigationGitHubActions from './private/ActionButtons/NavigationGitHubActions';
import NavSearchComponent from './private/SubMenuSections/NavSearchComponent';
import NavNodeVisualizationOptions from './private/SubMenuSections/NavNodeVisualizationOptions';
import {
  defaultOpenKeys,
  NavigationLabels,
} from '../../utils/constants/constants';

const NavigationPanel = ({ collapsed, setIsHelpVisible }) => {
  return (
    <>
      <NavigationSider
        collapsed={collapsed}
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
            <NavSearchComponent />
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
        </Menu>
      </NavigationSider>
    </>
  );
};

NavigationPanel.propTypes = {
  collapsed: PropTypes.any,
  setIsHelpVisible: PropTypes.any,
};

export default NavigationPanel;
