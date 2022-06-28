import { Collapse, Image } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
const { Panel } = Collapse;
import React from 'react';
import { HelpPanelLabels } from '../../../utils/constants/constants';

const NodesSection = () => {
  return (
    <>
      <Paragraph>{HelpPanelLabels.nodes.text}</Paragraph>

      <Collapse>
        <Panel key={''} header={HelpPanelLabels.nodes.default.header}>
          <Paragraph>{HelpPanelLabels.nodes.default.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.default.img} />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.nodes.size.header}>
          <Paragraph>{HelpPanelLabels.nodes.size.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.size.img} />
        </Panel>

        <Panel
          key={HelpPanelLabels.nodes.color.key}
          header={HelpPanelLabels.nodes.color.header}
        >
          <Paragraph>{HelpPanelLabels.nodes.color.text}</Paragraph>
          <Image src={HelpPanelLabels.nodes.color.img} />
        </Panel>
      </Collapse>
    </>
  );
};

export default NodesSection;
