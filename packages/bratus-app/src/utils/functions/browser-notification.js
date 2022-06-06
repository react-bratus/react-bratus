import React from 'react';
import { Button, notification } from 'antd';

export const triggerBrowserWarning = (
  setIsBrowserWarningHidden,
  isBrowserWarningHidden
) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => {
        notification.close(key);
        setIsBrowserWarningHidden(true);
      }}
    >
      Don&apos;t show this again
    </Button>
  );
  const title = <b>Browser Warning</b>;

  // No reason to display warning if we are already using Chrome
  const isChromeAgent = navigator.userAgent.indexOf('Chrome') > -1;

  const notificationTriggerCondition =
    !isChromeAgent && !isBrowserWarningHidden;

  notificationTriggerCondition &&
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
