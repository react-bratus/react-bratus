import React from 'react';
import { QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { recompile } from '../../../../api';
import PropTypes from 'prop-types';
import { ActionButton, PrimaryActionsWrapper } from './ActionButtons.sc';

export const NavigationPrimaryActions = ({ setIsHelpVisible }) => {
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
    <PrimaryActionsWrapper>
      <ActionButton
        type="primary"
        shape={'round'}
        size="middle"
        icon={<ReloadOutlined />}
        onClick={triggerRecompile}
      >
        Recompile Project
      </ActionButton>

      <ActionButton
        type="primary"
        shape={'round'}
        size="middle"
        icon={<QuestionCircleOutlined />}
        onClick={() => setIsHelpVisible(true)}
      >
        Open help
      </ActionButton>
    </PrimaryActionsWrapper>
  );
};

NavigationPrimaryActions.propTypes = {
  setIsHelpVisible: PropTypes.any,
};

export default NavigationPrimaryActions;
