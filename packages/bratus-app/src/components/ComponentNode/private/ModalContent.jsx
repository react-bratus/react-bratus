import React from 'react';
import { Divider, Button } from 'antd';

const ModalContent = (node) => {
  console.log('Incoming node:', node);
  const nodeDetails = node.node.data;
  const componentType =
    nodeDetails.component.node.type == 'VariableDeclaration'
      ? 'arrow function'
      : nodeDetails.component.node.type == 'FunctionDeclaration'
      ? 'function'
      : 'class';
  return (
    <>
      <p>
        This is a{' '}
        <span style={{ color: '#0080ff' }}>{componentType} component</span>,
        rendered{' '}
        <span style={{ color: '#ff8400' }}>
          {nodeDetails.component.timesUsed}
        </span>{' '}
        times in your project and it has{' '}
        <span style={{ color: '#53edb2' }}>{nodeDetails.linesOfCode}</span>{' '}
        lines of code.
      </p>
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

// Arrow Function Component
// Function Component
// Class Component
