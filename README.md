# i18n-app

## `i18n-app/blob/main/src/i18n.js`
I18next is a well-written package for internationalization; however, it is often used incorrectly and inefficiently.

Here, I have added i18n.js with the correct locale codes and resource structure, as well as initialized the Pseudo package correctly. Many products do not realize the importance of Pseudo Localization testing and either skip it or do it inefficiently.

```javascript
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
...
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
```

By default, if en-US is specified, strings that have been extracted can undergo PL testing. However, since numbers and dates are displayed in the en-US format, it can be difficult for someone conducting PL testing to determine if the formatting has been properly implemented based on i18n standards.
```javascript
  .use(new Pseudo({
    enabled: true,
    languageToPseudo: 'pt-BR',
    letterMultiplier:1,
    wrapped: true
  }))
```
