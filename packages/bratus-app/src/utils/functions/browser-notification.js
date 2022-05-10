import React from 'react';
import { Button, notification } from 'antd';

export const triggerBrowserWarning = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      I understand
    </Button>
  );
  const title = <b>Browser Warning</b>;

  notification['warning']({
    message: title,
    description:
      'Dear Users, for your best experience, we recommend you using Chrome.',
    btn,
    key,
    duration: 10,
    onClose: close,
  });
};
