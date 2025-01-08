'use client';

import { useState, useEffect } from 'react';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  zh: () => import('../dictionaries/nor.json').then((module) => module.default),
};

export const useDictionary = (locale) => {
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    const loadDictionary = async () => {
      if (dictionaries[locale]) {
        const dict = await dictionaries[locale]();
        setDictionary(dict);
      } else {
        console.error(`Locale ${locale} not supported`);
      }
    };
    loadDictionary();
  }, [locale]);

  return dictionary;
};
