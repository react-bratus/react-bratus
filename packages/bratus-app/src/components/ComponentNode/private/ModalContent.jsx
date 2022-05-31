import React from 'react';
import { Divider, Button } from 'antd';

const ModalContent = (node) => {
  console.log('Incoming node:', node);
  const nodeDetails = node.node.data;
  return (
    <>
      <p>This component is used: {nodeDetails.component.timesUsed} times.</p>
      <p>Lines of code: {nodeDetails.linesOfCode}</p>
      <Divider />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={() => {
            nodeDetails.onShowNodeDetail(node.node);
          }}
          type="primary"
        >
          Quick Code Preview
        </Button>
        <Button type="primary" href={`vscode://file/${nodeDetails.path}`}>
          Open file in Visual Studio Code
        </Button>
      </div>
    </>
  );
};

export default ModalContent;
