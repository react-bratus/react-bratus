import { Button, Layout, Menu, message, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { recompile } from '../../../api';
import { baseUnit, navigationWidth } from '../../tokens/units';
import NavigationSection from '../NavigationSection';
const { Paragraph, Title } = Typography;

const StyledTitle = styled(Title)`
  color: #fff !important;
  text-align: center;
`;

const InfoParagraph = styled(Paragraph)`
  color: #fff;
  line-height: ${baseUnit * 2}px;
  font-size: ${baseUnit + 2}px;
  text-align: right;
  padding: 0 ${baseUnit}px;
`;

const HighLightedNumber = styled.span`
  color: ${({ theme }) => theme.primary};
`;

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

const Navigation = ({ info }) => {
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
      <StyledTitle level={1}>react-bratus</StyledTitle>
      <Menu theme="dark" mode="inline">
        {info && (
          <NavigationSection title="Info">
            <InfoParagraph>
              your tree contains{' '}
              <HighLightedNumber>{info.uniqueComponents} </HighLightedNumber>
              unique components
            </InfoParagraph>
            <InfoParagraph>
              your components are on average reused
              <HighLightedNumber>
                {' '}
                {info.averageTimesUsed.toFixed(2)}{' '}
              </HighLightedNumber>
              times
            </InfoParagraph>
            <InfoParagraph>
              your average component consist of
              <HighLightedNumber>
                {' '}
                {info.averageLinesOfCode.toFixed(0)}{' '}
              </HighLightedNumber>
              lines of code
            </InfoParagraph>
          </NavigationSection>
        )}
        <NavigationSection title="Actions">
          <Actions>
            <Button onClick={compile} ghost>
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
          </Actions>
        </NavigationSection>
        <NavigationSection title="Controls">
          <InfoParagraph>
            hover components with your mouse to highlight
          </InfoParagraph>
          <InfoParagraph>click a component to lock the highlight</InfoParagraph>
        </NavigationSection>
      </Menu>
    </Sider>
  );
};
Navigation.propTypes = {
  info: PropTypes.any,
};

export default Navigation;
