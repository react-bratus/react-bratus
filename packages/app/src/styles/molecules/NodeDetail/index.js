import { LoadingOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import PropTypes from 'prop-types';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
const StyledRow = styled(Row)`
  pre {
    width: 100%;
  }
`;
const NodeDetail = ({ nodeDetail }) => {
  if (!nodeDetail.visible) {
    return <LoadingOutlined spin />;
  }
  return (
    <Col>
      <StyledRow>
        <Col>
          <Title level={5}>Path</Title>

          <Text copyable>
            <a href={`vscode://file/${nodeDetail.node.data.path}`}>
              {nodeDetail.node.data.path}
            </a>
          </Text>
        </Col>
        <Divider />

        <Title level={5}>Code</Title>
        <SyntaxHighlighter style={vscDarkPlus} language="javascript">
          {nodeDetail.node.data.code}
        </SyntaxHighlighter>
      </StyledRow>
    </Col>
  );
};

NodeDetail.propTypes = {
  nodeDetail: PropTypes.any,
};

export default NodeDetail;
