import { Button, Input, Select, Switch, TreeSelect } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MenuDivider from 'antd/lib/menu/MenuDivider';
import SubMenu from 'antd/lib/menu/SubMenu';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import styled, { css } from 'styled-components';
import { Colors } from '../../utils/constants/colors';
import { baseUnit } from '../../utils/constants/units';

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

export const SubtreeSwitchWrapper = styled.div`
  padding: ${baseUnit}px ${baseUnit * 2}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterSwitch = styled(Switch)`
  &[aria-checked='false'] {
    background-color: rgba(0, 0, 0);
  }
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

export const SearchNodeExplanationText = styled(Text)`
  display: block;
  color: white;
  padding: ${baseUnit}px ${baseUnit * 2}px;
  line-height: normal;
`;

export const SubtreeModeText = styled(Text)`
  color: white;
`;

export const TimesUsedInputGroup = styled(Input.Group)`
  padding: 0 ${baseUnit * 2}px ${baseUnit * 2}px;
  .ant-input {
    width: 65%;
  }
`;

export const TimesUsedButton = styled(Button)`
  width: 35%;
`;

export const ImportantKeyword = styled.span`
  color: ${Colors.leaf};
`;
