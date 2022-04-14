import {
  GithubOutlined,
  ReadOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import React from 'react';
import { HelpPanelLabels } from '../../../utils/constants/constants';
import { StyledLi, StyledLink, StyledUl } from '../HelpPanel.sc';

const LinksSection = () => {
  return (
    <StyledUl>
      <StyledLi>
        <GithubOutlined />
        <StyledLink href={HelpPanelLabels.links.repoUrl}>
          {HelpPanelLabels.links.repo}
        </StyledLink>
      </StyledLi>

      <StyledLi>
        <ReadOutlined />
        <StyledLink href={HelpPanelLabels.links.changelogUrl}>
          {HelpPanelLabels.links.changeLog}
        </StyledLink>
      </StyledLi>

      <StyledLi>
        <YoutubeOutlined />
        <StyledLink href={HelpPanelLabels.links.demoUrl}>
          {HelpPanelLabels.links.demo}
        </StyledLink>
      </StyledLi>
    </StyledUl>
  );
};

export default LinksSection;
