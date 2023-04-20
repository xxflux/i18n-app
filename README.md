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

## NumberFormat
[Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) is a built-in JavaScript object that provides a way to format numbers according to a specific locale. It allows you to display numbers in the format that is appropriate for the user's language, country, and cultural preferences.

You can use the `Intl.NumberFormat` constructor to create a formatter object with options that define the locale and other formatting settings. The options include the following:
* `locale`: The locale identifier for the locale to use. This can be a string representing a language tag, or an array of such strings, in descending order of preference.
* `style`: The style of formatting to use. This can be "decimal" (for plain number formatting), "percent" (for percentage formatting), or "currency" (for currency formatting).
* `currency`: If the style is "currency", the ISO 4217 currency code to use.
* `minimumFractionDigits`: The minimum number of digits to display after the decimal point, default is 0.
* `maximumFractionDigits`: The maximum number of digits to display after the decimal point, default is 3.
* `minimumIntegerDigits`: The minimum number of digits to display before the decimal point, default is 1.
* `useGrouping`: Whether to use grouping separators (such as commas) to separate groups of digits, default is `true`.

Once you have created an Intl.NumberFormat object, you can use its format method to format a number according to the options you specified. The format method takes a number as its argument and returns a string representing that number in the specified format.

Here's an example of using Intl.NumberFormat to format a number in the user's preferred locale:

```javascript
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const amount = 1234.56;
console.log(formatter.format(amount)); // "$1,234.56"

const number = 123456.789;
console.log(new Intl.NumberFormat('en-US', { style: 'percent' }).format(number));
// "12,345,679%"
console.log(new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number));
// "123,456.79"

```
