import { i18n } from '@lingui/core';

export const getUserLocale = () => {
  // Returns "en-GB"
  const languageCode =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  // Returns "en"
  return languageCode.split('-')[0];
};

export async function activate(locale) {
  const { messages } = await import(`../locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
