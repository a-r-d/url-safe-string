import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const UrlSafeString = require('../url-safe-string.js');

describe('UrlSafeTag', function () {
  describe('generate', function () {
    it('should generate a tag from a single String argument', function () {
      const testData = 'Game Of Thrones: A Song of Ice and Fire',
        urlSafe = new UrlSafeString(),
        output = urlSafe.generate(testData);

      expect(output).toBe('game-of-thrones-a-song-of-ice-and-fire');
    });

    it('should generate a tag from a multiple String arguments', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate(
          'Game Of Thrones:',
          'A Song of Ice and Fire',
          'By George R. R. Martin'
        );

      expect(output).toBe('game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and strip whitespace', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate(
          ' Game Of Thrones: ',
          ' A Song of Ice and Fire \n',
          '\nBy George R. R. Martin '
        );

      expect(output).toBe('game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and remove duplicate join strings', function () {
      const urlSafe = new UrlSafeString({ joinString: '-' }),
        output = urlSafe.generate(
          'Some-Book -Name- -Here!',
          'Some authors-- Name',
          'Publisher -----or something..'
        );

      expect(output).toBe('some-book-name-here-some-authors-name-publisher-or-something');
    });

    it('should generate a tag from a different kind of join string', function () {
      const urlSafe = new UrlSafeString({ joinString: '_' }),
        output = urlSafe.generate(
          'Some_Book _Name_ _Here!',
          'Some authors-- Name',
          'Publisher ____or something..'
        );

      expect(output).toBe('some_book_name_here_some_authors_name_publisher_or_something');
    });

    it('should truncate beyond maxLen', function () {
      const urlSafe = new UrlSafeString({ joinString: '~', maxLen: 20 }),
        output = urlSafe.generate(
          'Some_Book _Name_ _Here!',
          'Some authors-- Name',
          'Publisher ____or something..'
        );

      expect(output).toBe('somebook~name~here~s');
    });

    it('should allow upercase with lowercaseOnly set to false', function () {
      const urlSafe = new UrlSafeString({ lowercaseOnly: false }),
        output = urlSafe.generate(
          'Some_Book _Name_ _Here!',
          'Some authors-- Name',
          'Publisher ____or something..'
        );

      expect(output).toBe('SomeBook-Name-Here-Some-authors-Name-Publisher-or-something');
    });

    it('should allow additional special chars if you override regexRemovePattern', function () {
      const urlSafe = new UrlSafeString({ regexRemovePattern: /((?!([a-z0-9<])).)/gi }),
        output = urlSafe.generate(
          'Some Book Name< Here!',
          '<Some authors <Name',
          'Publisher <or something..'
        );

      expect(output).toBe('some-book-name<-here-<some-authors-<name-publisher-<or-something');
    });

    it('should remove all types of special chars', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate(
          'The Three-Body Problem (simplified Chinese: 三体; traditional Chinese: 三體, "Three Body") ',
          'by Cixin Liu'
        );

      expect(output).toBe(
        'the-three-body-problem-simplified-chinese-traditional-chinese-three-body-by-cixin-liu'
      );
    });

    it('should not trim whitespace if you ask it not to', function () {
      const urlSafe = new UrlSafeString({ trimWhitespace: false, trimResult: false }),
        output = urlSafe.generate(
          ' Some Book Name Here! ',
          ' Some authors Name ',
          ' Publisher or something .. '
        );

      expect(output).toBe('-some-book-name-here-some-authors-name-publisher-or-something-');
    });

    it('should blow up with no args', function () {
      const urlSafe = new UrlSafeString();

      expect(() => urlSafe.generate()).toThrow(Error);
    });

    it('should blow up with on non-string args', function () {
      const urlSafe = new UrlSafeString();

      expect(() => urlSafe.generate('string', 12345)).toThrow(Error);
      expect(() => urlSafe.generate({})).toThrow(Error);
    });

    it('should work without new keyword', function () {
      const urlSafe = UrlSafeString(),
        output = urlSafe.generate('Hello World');

      expect(output).toBe('hello-world');
    });

    it('should transliterate German umlauts to ASCII equivalents', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('München Zürich Köln');

      expect(output).toBe('muenchen-zuerich-koeln');
    });

    it('should transliterate eszett', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Straße');

      expect(output).toBe('strasse');
    });

    it('should transliterate French accented characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Crème brûlée à la française');

      expect(output).toBe('creme-brulee-a-la-francaise');
    });

    it('should transliterate Nordic characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Ærø Ødegård Þór');

      expect(output).toBe('aero-odegard-thor');
    });

    it('should transliterate Spanish and Portuguese characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('El Niño São Paulo');

      expect(output).toBe('el-nino-sao-paulo');
    });

    it('should transliterate Polish characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Łódź Śląsk');

      expect(output).toBe('lodz-slask');
    });

    it('should transliterate Polish ogonek characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Łąka Gęś');

      expect(output).toBe('laka-ges');
    });

    it('should transliterate Czech characters', function () {
      const urlSafe = new UrlSafeString(),
        output = urlSafe.generate('Dvořák Řežábek');

      expect(output).toBe('dvorak-rezabek');
    });

    it('should preserve case when transliterating with lowercaseOnly false', function () {
      const urlSafe = new UrlSafeString({ lowercaseOnly: false }),
        output = urlSafe.generate('Über Österreich');

      expect(output).toBe('Ueber-Oesterreich');
    });

    it('should skip transliteration when transliterate is false', function () {
      const urlSafe = new UrlSafeString({ transliterate: false }),
        output = urlSafe.generate('München Zürich');

      expect(output).toBe('mnchen-zrich');
    });

    it('should strip leading and trailing join strings by default', function () {
      const urlSafe = new UrlSafeString({ trimWhitespace: false }),
        output = urlSafe.generate(' Hello World ');

      expect(output).toBe('hello-world');
    });

    it('should keep leading and trailing join strings when trimResult is false', function () {
      const urlSafe = new UrlSafeString({ trimWhitespace: false, trimResult: false }),
        output = urlSafe.generate(' Hello World ');

      expect(output).toBe('-hello-world-');
    });

    it('should allow custom transliterations to override defaults', function () {
      const urlSafe = new UrlSafeString({
        transliterations: { 'ö': 'o' }
      }),
        output = urlSafe.generate('Köln');

      expect(output).toBe('koln');
    });

    it('should allow custom transliterations for new characters', function () {
      const urlSafe = new UrlSafeString({
        transliterations: { '&': 'and', '@': 'at', '€': 'eur' }
      }),
        output = urlSafe.generate('Tom & Jerry @ home');

      expect(output).toBe('tom-and-jerry-at-home');
    });

    it('should preserve default transliterations when adding custom ones', function () {
      const urlSafe = new UrlSafeString({
        transliterations: { '&': 'and' }
      }),
        output = urlSafe.generate('Müller & Söhne');

      expect(output).toBe('mueller-and-soehne');
    });

    it('should support static generate method', function () {
      const output = UrlSafeString.generate('Hello World!');

      expect(output).toBe('hello-world');
    });

    it('should support static generate with multiple arguments', function () {
      const output = UrlSafeString.generate('Hello', 'World');

      expect(output).toBe('hello-world');
    });
  });
});
