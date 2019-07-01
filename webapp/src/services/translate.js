import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import CONFIG from '../config';
import { axiosPost } from './axios';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'fr',
        debug: process.env.NODE_ENV === 'development',
        backend: {
            loadPath: `${CONFIG.API.BASE_URL}/translate/{{lng}}`
        },
        saveMissing: true,
        missingKeyHandler: function (lng, ns, key, fallbackValue) {
            console.log('translate missing', key, lng);
            axiosPost(`/translate/${lng}`, { term: key });
        },
        // fallbackLng: localStorage.getItem(''),
        whitelist: ['fr', 'en'],
        keySeparator: false,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;