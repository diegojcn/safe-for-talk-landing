import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import  pt  from "./locales/pt.json";
import  en  from "./locales/en.json";


i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: navigator.language.startsWith('pt') ? 'pt' : 'en', // detecta idioma do navegador
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;