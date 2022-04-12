import { Select, TreeSelect } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MenuDivider from 'antd/lib/menu/MenuDivider';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import styled, { css } from 'styled-components';
import { baseUnit } from '../../utils/tokens/units';

export const NavigationSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

export const AppTitle = styled(Title)`
  color: #fff !important;
  padding-left: 24px;
  margin-top: 24px;
  margin-bottom: 0;
`;

export const StyledSubMenu = styled(SubMenu)`
  font-size: 16px;

  .ant-menu-inline.ant-menu-sub {
    background-color: hsl(209, 100%, 11%);
  }

  .ant-menu-submenu {
    background-color: #001529;
  }
`;

const navigationDropdownStyles = css`
  width: 100%;
  padding: ${baseUnit}px ${baseUnit * 2}px;

  .ant-select-arrow {
    margin-right: ${baseUnit * 2}px;
    cursor: pointer;
    color: #001529;
  }
`;

export const DropdownInput = styled(Select)`
  ${navigationDropdownStyles}
`;

export const BaselineInputWrapper = styled.div`
  ${navigationDropdownStyles}
`;

export const TreeComponentDropdown = styled(TreeSelect)`
  ${navigationDropdownStyles}
`;

export const StyledDropDownSelect = {
  maxHeight: 550,
  maxWidth: 302,
  minWidth: 'unset',
  width: 302,
  overflow: 'auto',
};

export const StyledMenuDivider = styled(MenuDivider)`
  margin: 0 ${baseUnit / 2}px !important;
`;
