import { Collapse, Drawer, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React from 'react';
import { HelpPanelProps } from '../../interfaces/component-interfaces';
import { HelpPanelLabels } from '../../utils/constants/constants';
import EdgesSection from './private/EdgesSection';
import LinksSection from './private/LinksSection';
import NodesSection from './private/NodesSection';
import PreferencesSection from './private/PreferencesSection';
const { Title } = Typography;
const { Panel } = Collapse;

const HelpPanel = ({
  isHelpVisible,
  setIsHelpVisible,
  isHelpHiddenOnStartUp,
  setIsHelpHiddenOnStartUp,
  isVerticalTreeLayoutAsDefault,
  setVerticalTreeLayoutAsDefault,
}: HelpPanelProps) => {
  return (
    <Drawer
      width={720}
      onClose={() => setIsHelpVisible(false)}
      visible={isHelpVisible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Title level={3}>{HelpPanelLabels.title}</Title>
      <Title level={5}>{HelpPanelLabels.thanks}</Title>
      <Paragraph>{HelpPanelLabels.purpose}</Paragraph>

      <Collapse defaultActiveKey={'preferences'}>
        <Panel key={''} header={HelpPanelLabels.nodes.title}>
          <NodesSection />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.edges.title}>
          <EdgesSection />
        </Panel>

        <Panel key={'preferences'} header={HelpPanelLabels.pref.title}>
          <PreferencesSection
            isHelpHiddenOnStartUp={isHelpHiddenOnStartUp}
            setIsHelpHiddenOnStartUp={setIsHelpHiddenOnStartUp}
            isVerticalTreeLayoutAsDefault={isVerticalTreeLayoutAsDefault}
            setVerticalTreeLayoutAsDefault={setVerticalTreeLayoutAsDefault}
          />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.links.title}>
          <LinksSection />
        </Panel>
      </Collapse>
    </Drawer>
  );
};

export default HelpPanel;
