import { LoadingOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { ComponentCodeRow } from './ComponentCode.sc';

// nodeDetail gives us additional information about the component.
const ComponentCode = ({ nodeDetail }) => {
  if (!nodeDetail.visible) {
    return <LoadingOutlined spin />;
  }

  return (
    <div>
      <ComponentCodeRow>
        <SyntaxHighlighter
          style={vscDarkPlus}
          showLineNumbers={true}
          language="javascript"
        >
          {nodeDetail.node.data.code}
        </SyntaxHighlighter>
        <Divider />
      </ComponentCodeRow>
    </div>
  );
};

ComponentCode.propTypes = {
  nodeDetail: PropTypes.any,
};

export default ComponentCode;
