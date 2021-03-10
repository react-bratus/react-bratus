import { i18n } from '@lingui/core';
import { Trans } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import React, { useEffect } from 'react';

import useLocale from './hooks/useLocale';
import I18nWatchLocaleProvider from './providers/I18nWatchLocaleProvider';
import ThemeProvider from './providers/ThemeProvider';
import { activate } from './utils';
const App = () => {
  const { locale } = useLocale();

  useEffect(() => {
    activate(locale);
    fetch('http://localhost:3000/data')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
  }, [locale]);
  return (
    <I18nProvider i18n={i18n}>
      <I18nWatchLocaleProvider>
        <ThemeProvider>
          <div>
            <p>
              <Trans>Add router here:::::</Trans>
            </p>
          </div>
        </ThemeProvider>
      </I18nWatchLocaleProvider>
    </I18nProvider>
  );
};

export default App;
