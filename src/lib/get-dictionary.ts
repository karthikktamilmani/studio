import type { Locale } from '@/config/site';

// Type for the dictionary structure
// This should match the structure of your JSON files
export type Dictionary = typeof import('@/dictionaries/en.json');

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loadDictionary = dictionaries[locale] || dictionaries.en;
  return loadDictionary();
};
