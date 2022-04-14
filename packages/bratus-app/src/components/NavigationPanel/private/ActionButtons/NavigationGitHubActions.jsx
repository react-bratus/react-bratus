import React from 'react';
import { ButtonLabels, UrlLabels } from '../../../../utils/constants/constants';
import { ActionButton, GitHubActionsWrapper } from './ActionButtons.sc';

const NavigationGitHubActions = () => {
  return (
    <GitHubActionsWrapper>
      <ActionButton target="_blank" href={UrlLabels.feedback} ghost>
        {ButtonLabels.feedback}
      </ActionButton>

      <ActionButton target="_blank" href={UrlLabels.bug} ghost>
        {ButtonLabels.bug}
      </ActionButton>

      <ActionButton target="_blank" href={UrlLabels.feature} ghost>
        {ButtonLabels.feature}
      </ActionButton>
    </GitHubActionsWrapper>
  );
};

export default NavigationGitHubActions;
