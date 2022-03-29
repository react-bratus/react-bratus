import { Select, TreeSelect, Button } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import styled from 'styled-components';

import { baseUnit } from '../../utils/tokens/units';

export const ColorInfoParagraph = styled(Paragraph)`
  color: #fff;
  line-height: ${baseUnit * 2}px;
  font-size: ${baseUnit + 2}px;
  text-align: right;
  padding: 0 ${baseUnit}px;
`;

export const AppTitle = styled(Title)`
  color: #fff !important;
  text-align: center;
`;

export const NavigationSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

export const DropdownInput = styled(Select)`
  width: 100%;
  padding: 0 ${baseUnit}px;
`;

export const BaselineInputWrapper = styled.div`
  width: 100%;
  padding: 0 ${baseUnit}px;
  margin-top: ${baseUnit}px;
`;

export const TreeComponentDropdown = styled(TreeSelect)`
  width: 100%;
  padding: 0 ${baseUnit}px;
`;

export const HelpPanelButton = styled(Button)`
  position: absolute;
  bottom: ${baseUnit * 2}px;
  left: ${baseUnit * 2}px;
`;
