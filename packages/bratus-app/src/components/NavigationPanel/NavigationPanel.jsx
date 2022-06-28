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
  ExperimentOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import NavExperimentalActions from './private/Experimental/NavExperimentalActions';
import NavSearchComponent from './private/SubMenuSections/NavSearchComponent';
import NavNodeVisualizationOptions from './private/SubMenuSections/NavNodeVisualizationOptions';
import {
  defaultOpenKeys,
  NavigationLabels,
} from '../../utils/constants/constants';
import { useZoomPanHelper } from 'react-flow-renderer';
import NavFilterComponent from './private/SubMenuSections/NavFilterComponent';

const NavigationPanel = ({
  isNavCollapsed,
  setComponentLabelFilter,
  setComponentNumberFilter,
  setComponentNameFilter,
  isFilterMode,
  setIsFilterMode,
}) => {
  const reactFlowInstance = useZoomPanHelper();

  useEffect(() => {
    setTimeout(() => {
      reactFlowInstance.fitView({ duration: 500 });
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
            <NavSearchComponent />
          </StyledSubMenu>

          <StyledMenuDivider />

          <StyledSubMenu
            key={'salam'}
            title={'Filters'}
            icon={<FilterOutlined />}
          >
            <NavFilterComponent
              setComponentLabelFilter={setComponentLabelFilter}
              setComponentNumberFilter={setComponentNumberFilter}
              setComponentNameFilter={setComponentNameFilter}
              isFilterMode={isFilterMode}
              setIsFilterMode={setIsFilterMode}
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
            key={'experimental-actions'}
            title={'Custom Root & Reset'}
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
  setComponentLabelFilter: PropTypes.func,
  setComponentNumberFilter: PropTypes.func,
  setComponentNameFilter: PropTypes.func,
  isFilterMode: PropTypes.bool,
  setIsFilterMode: PropTypes.func,
};

export default NavigationPanel;
