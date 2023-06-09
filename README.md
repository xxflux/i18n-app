# i18n-app

## `i18n-app/main/src/i18n.js`
I18next is a well-written package for internationalization; however, it is often used incorrectly and inefficiently.

Here, I have added i18n.js with the correct locale codes and resource structure, as well as initialized the Pseudo package correctly. Many products do not realize the importance of Pseudo Localization testing and either skip it or do it inefficiently.

```javascript
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
.use(new PseudoLoc({
    lengther:1,
    enabled: true,
    enableCJK: true,
    sourceLocale: 'pt-BR',
  }))
  .init({
    postProcess: ["pseudoloc"],
```

[Full code of the i18n.js](https://github.com/xxflux/i18n-app/blob/main/src/i18n.js)

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

# DateTimeFormat
[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) is a built-in object in JavaScript that provides a way to format date and time values based on the locale of the user. It's part of the Internationalization API which was introduced in ECMAScript 2015 (ES6).

Here is an example of how to use Intl.DateTimeFormat:
```javascript
const date = new Date('2022-05-01T00:00:00.000Z');
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formatter = new Intl.DateTimeFormat('en-US', options);
console.log(formatter.format(date)); // output: "May 1, 2022"

const date = new Date('2023-04-21');
const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
const formatter = new Intl.DateTimeFormat('ko-KR', options);
console.log(formatter.format(date)); // 출력 결과: "2023년 4월 21일 목요일"
```

In this example, we first create a Date object representing May 1, 2022. We then define an object called options which specifies the date formatting options we want. We want the year to be displayed as a numeric value, the month to be displayed as a long string (e.g. "May"), and the day to be displayed as a numeric value.

We then create a new Intl.DateTimeFormat object, passing in the desired locale ("en-US" in this case) and the formatting options. Finally, we call the format() method on the formatter object and pass in the date object we want to format.

The Intl.DateTimeFormat object provides a wide range of options for customizing the date and time formatting to suit the user's locale. It supports different date and time styles, as well as options for customizing the format of the individual components (year, month, day, etc.).

## Utility Dateformatter
```javascript
export function formatDate(value) {
  const {
    language = 'en-US',
    inputFormat = moment.ISO_8601,
    outputFormat = 'short'
  } = options;
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: outputFormat,
    day: 'numeric',
  }).format(moment(value, inputFormat, true).toDate());
```

This is a function called `formatDate` that takes a `value` parameter and returns a formatted date string. Here's how it works:

* The function first destructures an object called `options` that has three properties: `language`, `inputFormat`, and `outputFormat`. If any of these properties are not provided, the function sets default values for them.
* The function then creates a new `Intl.DateTimeFormat` object that takes two arguments: the `language` property from options, and an object that specifies how the date should be formatted. In this case, the object specifies that the year should be formatted numerically, the month should use the outputFormat from options, and the day should be formatted numerically.
* The function then uses `moment` to parse the `value` parameter, using the `inputFormat` property from options as a guide. It sets the strict flag to `true`, which means that moment will only parse the value if it exactly matches the `inputFormat`. This helps prevent formatting errors.
* The `toDate()` method is then called on the `moment` object to convert it to a JavaScript Date object.
* Finally, the `Intl.DateTimeFormat` object's `format()` method is called on the Date object to return the formatted date string.

The `moment` library is being used in this function to convert the input value to a Date object that can be used by the `Intl.DateTimeFormat` function. The `formatDate` function takes an input value, which is assumed to be a date string in a specific format, specified by the `inputFormat` option.

Before the value can be formatted using `Intl.DateTimeFormat`, it needs to be converted to a Date object. The `moment` library is used for this because it provides a convenient way to parse a date string into a Date object, even when the input string is in a non-standard format.
