import { i18n } from '@lingui/core';
import { useLingui } from '@lingui/react';
import { da, en } from 'make-plural/plurals';
import PropTypes from 'prop-types';
import React from 'react';

i18n.loadLocaleData('en', { plurals: en });
i18n.loadLocaleData('da', { plurals: da });

const I18nWatchLocaleProvider = ({ children }) => {
  const { i18n } = useLingui();

  // Skip render when locale isn't loaded
  if (!i18n.locale) return null;

  // Force re-render when locale changes. Otherwise translations won't be updated.
  return <>{children}</>;
};

I18nWatchLocaleProvider.propTypes = {
  children: PropTypes.any,
};

export default I18nWatchLocaleProvider;
