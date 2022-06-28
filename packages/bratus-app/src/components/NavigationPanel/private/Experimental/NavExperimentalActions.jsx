import React from 'react';
import { ApartmentOutlined, ReloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import {
  ActionButton,
  RecompileActionsWrapper,
} from '../ActionButtons/ActionButtons.sc';
import { useState } from 'react';
import { makeConfiguration, recompile } from '../../../../api';
import { ButtonLabels } from '../../../../utils/constants/constants';

export const NavExperimentalActions = () => {
  const [customRootComponents, setCustomRootComponents] = useState('App');

  const triggerRecompile = () => {
    recompile()
      .then(location.reload())
      .catch((error) => console.log('An error occurred ', error));
  };

  const triggerCustomConfiguration = (newRoots) => {
    makeConfiguration(newRoots).then(triggerRecompile());
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
        icon={<ApartmentOutlined />}
        onClick={() => triggerCustomConfiguration(customRootComponents)}
      >
        {'Set custom roots'}
      </ActionButton>

      <ActionButton
        type="primary"
        shape="round"
        size="middle"
        icon={<ReloadOutlined />}
        onClick={() => triggerCustomConfiguration('App')}
      >
        {ButtonLabels.recompile}
      </ActionButton>
    </RecompileActionsWrapper>
  );
};

export default NavExperimentalActions;
