import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ActionButton, RecompileActionsWrapper } from './ActionButtons.sc';
import { useState } from 'react';
import { recompileWithInput } from '../../../../api';

export const NavigationRecompileActions = () => {
  const [rootComponents, setRootComponent] = useState('');

  const triggerRecompile = (input) => {
    recompileWithInput(input)
      .then(window.reload())
      .catch((error) => console.log('An error occurred ', error));
  };

  function handleChange(e) {
    const { value } = e.target;
    setRootComponent(value);
  }

  return (
    <RecompileActionsWrapper>
      <Input.Group compact>
        <Input
          style={{ width: '75%' }}
          defaultValue="App"
          name="roots"
          value={rootComponents}
          onChange={handleChange}
        />
        <br />
        <ActionButton
          type="primary"
          shape={'round'}
          size="small"
          icon={<ReloadOutlined />}
          onClick={() => triggerRecompile(rootComponents)}
        >
          Recompile with input
        </ActionButton>
      </Input.Group>
    </RecompileActionsWrapper>
  );
};

export default NavigationRecompileActions;
