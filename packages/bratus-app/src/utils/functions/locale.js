import { i18n } from '@lingui/core';

export const getUserLocale = () => {
  // Returns "en-GB"
  const languageCode =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  // language-code = primary-code ( "-" subcode )*
  // Subcode is usually the Country Code
  const langPrimaryCode = languageCode.split('-')[0];

  const defaultEnLanguageFallback =
    langPrimaryCode !== 'da' || langPrimaryCode !== 'en'
      ? 'en'
      : langPrimaryCode;

  return defaultEnLanguageFallback;
};

export async function activate(locale) {
  const { messages } = await import(`../../locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
