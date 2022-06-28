import { Typography } from 'antd';
import React from 'react';
import { ButtonLabels, UrlLabels } from '../../../../utils/constants/constants';
import { StyledLi } from '../../../HelpPanel/HelpPanel.sc';
const { Link } = Typography;

// Buttons on sider to submit feedback, bugs and potential features
const NavigationGitHubActions = () => {
  return (
    <ul>
      <StyledLi>
        <Link target="_blank" href={UrlLabels.feedback}>
          {ButtonLabels.feedback}
        </Link>
      </StyledLi>

      <StyledLi>
        <Link target="_blank" href={UrlLabels.bug}>
          {ButtonLabels.bug}
        </Link>
      </StyledLi>

      <StyledLi>
        <Link target="_blank" href={UrlLabels.feature}>
          {ButtonLabels.feature}
        </Link>
      </StyledLi>
    </ul>
  );
};

export default NavigationGitHubActions;
