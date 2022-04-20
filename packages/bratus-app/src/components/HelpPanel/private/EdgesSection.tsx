import { Collapse, Image } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
const { Panel } = Collapse;
import React from 'react';
import { HelpPanelLabels } from '../../../utils/constants/constants';

const EdgesSection = () => {
  return (
    <>
      <Paragraph>{HelpPanelLabels.edges.text}</Paragraph>

      <Collapse defaultActiveKey={HelpPanelLabels.edges.default.key}>
        <Panel
          key={HelpPanelLabels.edges.default.key}
          header={HelpPanelLabels.edges.default.header}
        >
          <Paragraph>{HelpPanelLabels.edges.default.text}</Paragraph>
          <Image src={HelpPanelLabels.edges.default.img} />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.edges.conditional.header}>
          <Paragraph>{HelpPanelLabels.edges.conditional.text}</Paragraph>
          <Image src={HelpPanelLabels.edges.conditional.img} />
        </Panel>

        <Panel key={''} header={HelpPanelLabels.edges.router.header}>
          <Paragraph>{HelpPanelLabels.edges.router.text}</Paragraph>
          <Image src={HelpPanelLabels.edges.router.img} />
        </Panel>
      </Collapse>
    </>
  );
};

export default EdgesSection;
