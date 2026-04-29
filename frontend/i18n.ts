import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ru'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale as string,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});