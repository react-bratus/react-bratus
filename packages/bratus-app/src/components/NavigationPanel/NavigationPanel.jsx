import { Menu } from 'antd';
import React from 'react';
import { navigationWidth } from '../../utils/tokens/units';
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
import { defaultOpenKeys } from '../../utils/tokens/constants';
import NavigationRecompileActions from './private/ActionButtons/NavigationRecompileActions';

const NavigationPanel = ({ collapsed, setIsHelpVisible }) => {
  return (
    <>
      <NavigationSider
        collapsed={collapsed}
        collapsedWidth={0}
        width={navigationWidth}
      >
        <AppTitle level={1}>React-bratus</AppTitle>

        <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys}>
          <StyledSubMenu
            key="search-component"
            title="Search for component"
            icon={<FileSearchOutlined />}
          >
            <NavSearchComponent />
          </StyledSubMenu>

          <StyledMenuDivider />
          <NavigationRecompileActions />
          <StyledMenuDivider />

          <StyledSubMenu
            key="node-visualization"
            title="Node visualization options"
            icon={<BgColorsOutlined />}
          >
            <NavNodeVisualizationOptions />
          </StyledSubMenu>

          <StyledMenuDivider />

          <StyledSubMenu
            key="navigation-actions"
            title="Actions"
            icon={<InteractionOutlined />}
          >
            <NavigationPrimaryActions setIsHelpVisible={setIsHelpVisible} />
            <StyledSubMenu
              key="github-actions"
              title="Contribute"
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
