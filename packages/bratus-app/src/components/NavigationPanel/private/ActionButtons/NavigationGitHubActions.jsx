import React from 'react';
import { ActionButton, GitHubActionsWrapper } from './ActionButtons.sc';

const NavigationGitHubActions = () => {
  return (
    <GitHubActionsWrapper>
      <ActionButton
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D"
        ghost
      >
        Give feedback
      </ActionButton>

      <ActionButton
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
        ghost
      >
        Submit bug
      </ActionButton>

      <ActionButton
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D"
        ghost
      >
        Suggest new feature
      </ActionButton>
    </GitHubActionsWrapper>
  );
};

export default NavigationGitHubActions;
