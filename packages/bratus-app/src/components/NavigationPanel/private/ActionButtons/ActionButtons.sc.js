import { Button } from 'antd';
import styled, { css } from 'styled-components';
import { baseUnit } from '../../../../utils/constants/units';

const navigationButtonsWrapperStyles = css`
  display: flex;
  flex-direction: column;
  column-gap: 5px;
`;

export const PrimaryActionsWrapper = styled.div`
  ${navigationButtonsWrapperStyles};
  padding: ${baseUnit}px ${baseUnit * 2}px;
  flex-direction: row;
  row-gap: 10px;
  width: 100%;
`;

export const GitHubActionsWrapper = styled.div`
  ${navigationButtonsWrapperStyles};
  padding: ${baseUnit}px ${baseUnit * 4}px;
`;

export const ActionButton = styled(Button)`
  width: 180px;
  margin-bottom: 10px;
`;
