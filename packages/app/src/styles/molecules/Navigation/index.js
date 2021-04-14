import { Button, Layout, Menu, message } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { recompile } from '../../../api';
import MenuTitle from '../../atoms/MenuTitle';
import { baseUnit, navigationWidth } from '../../tokens/units';

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  padding: ${baseUnit}px;
  margin-left: auto;
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-left: ${baseUnit}px;
      margin-bottom: ${baseUnit}px;
    }
  }
`;
const { Sider } = Layout;

const Navigation = () => {
  const compile = () => {
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
    <Sider
      width={navigationWidth}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <Menu theme="dark" mode="inline">
        <MenuTitle>Info</MenuTitle>
        <MenuTitle>Filters</MenuTitle>
        <MenuTitle>Actions</MenuTitle>
        <Actions>
          <Button onClick={compile} ghost>
            Recompile
          </Button>
        </Actions>
      </Menu>
    </Sider>
  );
};

export default Navigation;
