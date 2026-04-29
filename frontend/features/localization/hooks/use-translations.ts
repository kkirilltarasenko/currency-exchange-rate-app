"use client";

import { useLocalization } from '../context/localization-context';
import enMessages from '@/locales/en.json';
import ruMessages from '@/locales/ru.json';

type Messages = typeof enMessages;
type MessageKey = keyof Messages;
type NestedMessageKey<T> = T extends object 
  ? { [K in keyof T]: K extends string 
      ? T[K] extends object 
        ? `${K}.${NestedMessageKey<T[K]>}` 
        : K 
      : never 
    }[keyof T]
  : never;

type TranslationKey = NestedMessageKey<Messages>;

const messages = {
  en: enMessages,
  ru: ruMessages,
};

export function useTranslations() {
  const { locale } = useLocalization();

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English if key not found
        value = messages.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}