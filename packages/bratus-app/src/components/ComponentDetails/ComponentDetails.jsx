import { LoadingOutlined } from '@ant-design/icons';
import { Col, Divider } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import PropTypes from 'prop-types';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DetailsLabels } from '../../utils/constants/constants';

import { ComponentDetailsRow } from './ComponentDetails.sc';

const ComponentDetails = ({ nodeDetail }) => {
  if (!nodeDetail.visible) {
    return <LoadingOutlined spin />;
  }

  const timeUsed = nodeDetail.node.data.component.timesUsed;
  return (
    <div>
      <ComponentDetailsRow>
        <Col>
          <Title level={5}>{DetailsLabels.freq.title}</Title>
          <Text>
            {DetailsLabels.freq.text} {timeUsed} {DetailsLabels.freq.stext}
          </Text>
        </Col>
        <Divider />
        <Col>
          <Title level={5}>{DetailsLabels.path}</Title>
          <Text copyable>
            <a href={`vscode://file/${nodeDetail.node.data.path}`}>
              {nodeDetail.node.data.path}
            </a>
          </Text>
        </Col>
        <Divider />
        <Col>
          <Title level={5}>{DetailsLabels.code}</Title>

          <SyntaxHighlighter
            style={vscDarkPlus}
            showLineNumbers={true}
            language="javascript"
          >
            {nodeDetail.node.data.code}
          </SyntaxHighlighter>
        </Col>
        <Divider />
      </ComponentDetailsRow>
    </div>
  );
};

ComponentDetails.propTypes = {
  nodeDetail: PropTypes.any,
};

export default ComponentDetails;
