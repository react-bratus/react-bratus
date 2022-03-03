import { Button, message } from 'antd';
import React from 'react';

import { recompile } from '../../../../api';
import { ActionButtonsWrapper } from './NavigationActionButtons.sc';

const NavigationActionButtons = () => {
  const triggerRecompile = () => {
    recompile()
      .then(() => {
        const hide = message.loading(
          'Recompiling. Window will refresh soon..',
          0
        );
        setTimeout(() => hide, 2000);
        setTimeout(() => {
          location.reload();
        }, 4000);
      })
      .catch((error) => console.log('An error occurred ', error));
  };

  return (
    <ActionButtonsWrapper>
      <Button onClick={triggerRecompile} ghost>
        Recompile
      </Button>

      <Button
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D"
        ghost
      >
        Give feedback
      </Button>

      <Button
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
        ghost
      >
        Submit bug
      </Button>

      <Button
        target="_blank"
        href="https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D"
        ghost
      >
        Suggest new feature
      </Button>
    </ActionButtonsWrapper>
  );
};

export default NavigationActionButtons;
