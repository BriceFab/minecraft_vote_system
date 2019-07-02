import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translate_fr from '../translates/fr.json';
import translate_en from '../translates/en.json';
import CONFIG from '../config.js';

i18next
  .use(LanguageDetector)
  .init({
    lng: 'fr',
    fallbackLng: 'fr',
    debug: process.env.NODE_ENV === 'development' && CONFIG.TRANSLATE.DEBUG,
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`key {${key}} is missing for ${lng}`);
    },
    resources: {
      fr: {
        translation: translate_fr
      },
      en: {
        translation: translate_en
      }
    },
  });