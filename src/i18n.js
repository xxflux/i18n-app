import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PseudoLoc from 'i18next-pseudoloc';
import LanguageDetector from "i18next-browser-languagedetector";
import ResourceEnUs from './assets/locale/en-US/translation.json';
import ResourceEnGb from './assets/locale/en-GB/translation.json';
import ResourceEsEs from './assets/locale/es-ES/translation.json';
import ResourceEsLa from './assets/locale/es-LA/translation.json';
import ResourceKoKr from './assets/locale/ko-KR/translation.json';
import ResourceJaJp from './assets/locale/ja-JP/translation.json';
import ResourceDeDe from './assets/locale/de-DE/translation.json';

const resources = {
    EnUs: {
        translation: ResourceEnUs,
    },
    EnGb: {
        translation: ResourceEnGb,
    },
    KoKr: {
        translation: ResourceKoKr,
    },
    EsEs: {
        translation: ResourceEsEs,
    },
    EsLa: {
        translation: ResourceEsLa,
    },
    JaJp: {
        translation: ResourceJaJp,
    },
    DeDe: {
        translation: ResourceDeDe,
    },
};

const lng = 'en-US';
const fallbackLng = {
  'default': ['en-US'],
  'ko-KR': ['ko', 'en-US']
}
const availableLanguages = ['en-US', 'en-GB', 'es-ES', 'es-LA', 'ko-KR', 'ja-JP', 'de-DE', 'pt-BR'];
const detectionOptions = {
    order: [
        'cookie',
        'localStorage',
        'navigator',
        'subdomain',
        'queryString',
        'htmlTag',
    ],
    lookupFromPathIndex: 0,
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(new PseudoLoc({
    lengther:1,
    enabled: true,
    enableCJK: true,
    sourceLocale: 'pt-BR',
  }))
  .init({
    postProcess: ["pseudoloc"],
    resources: {
      //'en': resources.EnUs,
      'en-US': resources.EnUs,
      'en-GB': resources.EnGb,
      'es-ES': resources.EsEs,
      'es-LA': resources.EsLa,
      'ja-JP': resources.JaJp,
      'ko-KR': resources.KoKr,
      'de-DE': resources.PtBr,
      'pt-BR': resources.EnUs, // pt-BR is only for PL Test
    },
    lng,
    fallbackLng,
    whitelist: availableLanguages,
    debug: process.env.REACT_APP_ENV === 'development',
    detection: detectionOptions,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    load: 'all', // strategy to define which language codes to lookup.
  });
  // https://www.i18next.com/overview/configuration-options

export default i18n;
