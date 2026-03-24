# url-safe-string

[![CI](https://github.com/a-r-d/url-safe-string/actions/workflows/ci.yml/badge.svg)](https://github.com/a-r-d/url-safe-string/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/url-safe-string.svg)](https://badge.fury.io/js/url-safe-string)

[![NPM](https://nodei.co/npm/url-safe-string.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/url-safe-string/)

Zero-dependency module to convert strings into URL-safe slugs. Use for routing, SEO, permalinks, or anywhere you need a clean, URL-friendly string.

## Install

```bash
npm install url-safe-string
```

## Usage

### CommonJS

```javascript
const UrlSafeString = require('url-safe-string');
const tagGenerator = new UrlSafeString();

tagGenerator.generate('Hello World!');
// 'hello-world'

tagGenerator.generate('Some Book Name Here!', 'Some authors Name', 'Publisher or something...');
// 'some-book-name-here-some-authors-name-publisher-or-something'

// Accented characters are transliterated automatically
tagGenerator.generate('München Straße');
// 'muenchen-strasse'

tagGenerator.generate('Crème brûlée à la française');
// 'creme-brulee-a-la-francaise'

tagGenerator.generate('El Niño São Paulo');
// 'el-nino-sao-paulo'
```

### ES Modules

```javascript
import UrlSafeString from 'url-safe-string';

const tagGenerator = new UrlSafeString();
tagGenerator.generate('Hello World!');
// 'hello-world'
```

### TypeScript

```typescript
import UrlSafeString from 'url-safe-string';

const tagGenerator = new UrlSafeString({ maxLen: 50, lowercaseOnly: true });
const tag: string = tagGenerator.generate('Hello World!');
```

## Options

These are the default options, which can all be overridden by passing an object into the constructor.

```javascript
const tagGenerator = new UrlSafeString({
  maxLen: 100,                          // truncates beyond maxLen
  lowercaseOnly: true,                  // convert to lowercase
  regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
  joinString: '-',                      // separator: '-', '_', '~', etc.
  trimWhitespace: true,                 // trim input strings
  trimResult: true,                     // strip leading/trailing join strings
  transliterate: true,                  // convert accented chars to ASCII (ö -> oe)
  transliterations: { '&': 'and' }      // custom character mappings
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxLen` | `number` | `100` | Maximum length of the output string |
| `lowercaseOnly` | `boolean` | `true` | Convert output to lowercase |
| `regexRemovePattern` | `RegExp` | `/((?!([a-z0-9])).)/gi` | Pattern for characters to remove |
| `joinString` | `string` | `'-'` | String used to join words and replace whitespace |
| `trimWhitespace` | `boolean` | `true` | Trim leading/trailing whitespace from inputs |
| `trimResult` | `boolean` | `true` | Strip leading/trailing join strings from the output |
| `transliterate` | `boolean` | `true` | Transliterate accented/special characters to ASCII equivalents (e.g. `ö` -> `oe`, `ñ` -> `n`, `ß` -> `ss`). Covers German, French, Spanish, Portuguese, Nordic, Polish, Czech, and Romanian characters. |
| `transliterations` | `object` | `{}` | Custom character mapping merged on top of the defaults (e.g. `{ '&': 'and', '@': 'at' }`) |

### Static method

If you don't need custom options, you can skip the constructor:

```javascript
const UrlSafeString = require('url-safe-string');

UrlSafeString.generate('Hello World!');
// 'hello-world'

UrlSafeString.generate('München Straße');
// 'muenchen-strasse'
```

## Tests

```bash
npm test
```

## Upgrading

### v1.x to v2.0

The API is fully backwards compatible. No code changes are needed. The major version bump reflects the modernized tooling, new transliteration behavior, and minimum Node.js version change.

**Note on transliteration:** v2.0 transliterates accented characters by default (e.g. `ö` -> `oe`). In v1.x these characters were silently stripped. This means output may differ for inputs containing accented characters -- the new output is more correct and SEO-friendly. If you need the old behavior, set `transliterate: false`.

If you are on Node.js 14 or later (released 2020), v2.0 is a drop-in replacement:

```bash
npm install url-safe-string@latest
```

If you need to support Node.js < 14, pin to v1.x:

```bash
npm install url-safe-string@1
```

## Changelog

### 2.0.0

- Added automatic transliteration of accented/special characters to ASCII equivalents (enabled by default). Covers German (ä->ae, ö->oe, ü->ue, ß->ss), French, Spanish, Portuguese, Nordic, Polish, Czech, and Romanian characters. Can be disabled with `transliterate: false`. Closes [#2](https://github.com/a-r-d/url-safe-string/issues/2).
- Added `transliterations` option for custom character mappings (e.g. `{ '&': 'and', '@': 'at' }`), merged on top of defaults
- Added `trimResult` option (default `true`) to strip leading/trailing join strings from output
- Added `UrlSafeString.generate()` static convenience method -- no constructor needed for default options
- Added TypeScript type definitions (`index.d.ts`) -- fully typed options, instance, and constructor
- Added ES Module support -- `import UrlSafeString from 'url-safe-string'` now works alongside `require()`
- Added `exports` field for proper dual CJS/ESM package resolution
- Added `files` field to keep the published package minimal
- Minimum Node.js version bumped from 4 to 14
- Switched test runner from Mocha to Vitest
- Replaced Travis CI with GitHub Actions (testing Node 14, 16, 18, 20, 22)
- Improved npm discoverability with expanded keywords and description
- Updated README with ESM/TypeScript usage examples and options table

### 1.1.0

- Last release before the v2.0 modernization
- Supports Node.js >= 4
- CommonJS only (`require('url-safe-string')`)
- No TypeScript definitions
- If you need the pre-ES6 version, see v1.0.0

### 1.0.0

- Initial release with ES5 syntax

## License

ISC
