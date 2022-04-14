import { Collapse, Image } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
const { Panel } = Collapse;
import React from 'react';
import { HelpPanelLabels } from '../../../utils/constants/constants';

const NodesSection = () => {
  return (
    <>
      <Paragraph>{HelpPanelLabels.nodes.text}</Paragraph>

      <Collapse defaultActiveKey={'nodes-color'}>
        <Panel key={'nodes-color'} header={HelpPanelLabels.nodes.color.header}>
          <Paragraph>{HelpPanelLabels.nodes.color.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.color.img} />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.nodes.size.header}>
          <Paragraph>{HelpPanelLabels.nodes.size.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.size.img} />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.nodes.white.header}>
          <Paragraph>{HelpPanelLabels.nodes.white.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.white.img} />
        </Panel>
      </Collapse>
    </>
  );
};

export default NodesSection;
