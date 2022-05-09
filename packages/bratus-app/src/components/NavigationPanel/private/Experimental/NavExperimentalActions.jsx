import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {
  ActionButton,
  RecompileActionsWrapper,
} from '../ActionButtons/ActionButtons.sc';
import { useState } from 'react';
import { makeConfiguration, recompile } from '../../../../api';

export const NavExperimentalActions = () => {
  const [customRootComponents, setCustomRootComponents] = useState('App');

  const triggerCustomConfiguration = (newRoots) => {
    makeConfiguration(newRoots)
      .then(recompile())
      .then(location.reload())
      .catch((error) => console.log('An error occurred ', error));
  };

  function handleChange(e) {
    setCustomRootComponents(e.target.value);
  }

  return (
    <RecompileActionsWrapper>
      <Input.Group compact>
        <Input
          name="newCustomRoots"
          value={customRootComponents}
          onChange={handleChange}
        />
      </Input.Group>
      <br />
      <br />
      <ActionButton
        type="primary"
        shape="round"
        size="middle"
        icon={<ReloadOutlined />}
        onClick={() => triggerCustomConfiguration(customRootComponents)}
      >
        {'Set custom roots'}
      </ActionButton>
    </RecompileActionsWrapper>
  );
};

export default NavExperimentalActions;
