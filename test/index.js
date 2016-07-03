const UrlSafeString = require('../url-safe-string'),
      assert        = require('assert');

describe('UrlSafeTag', function() {
  describe('generate', function() {
    it('should generate a tag from a single String argument', function() {
      const testData = 'Game Of Thrones: A Song of Ice and Fire',
            urlSafe  = new UrlSafeString(),
            output   = urlSafe.generate(testData);

      assert.deepEqual(output, 'game-of-thrones-a-song-of-ice-and-fire');
    });

    it('should generate a tag from a multiple String arguments', function() {
      const urlSafe = new UrlSafeString(),
            output  = urlSafe.generate(
              'Game Of Thrones:',
              'A Song of Ice and Fire',
              'By George R. R. Martin'
            );

      assert.deepEqual(output,'game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and strip whitespace', function() {
      const urlSafe = new UrlSafeString(),
            output  = urlSafe.generate(
              ' Game Of Thrones: ',
              ' A Song of Ice and Fire \n',
              '\nBy George R. R. Martin '
            );

      assert.deepEqual(output, 'game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and remove duplicate join strings', function() {
      const urlSafe = new UrlSafeString({joinString: '-'}),
            output  = urlSafe.generate(
              'Some-Book -Name- -Here!',
              'Some authors-- Name',
              'Publisher -----or something..'
            );

      assert.deepEqual(output, 'some-book-name-here-some-authors-name-publisher-or-something');
    });

    it('should generate a tag from a different kind of join string', function() {
      const urlSafe = new UrlSafeString({joinString: '_'}),
            output  = urlSafe.generate(
              'Some_Book _Name_ _Here!',
              'Some authors-- Name',
              'Publisher ____or something..'
            );

      assert.deepEqual(output, 'some_book_name_here_some_authors_name_publisher_or_something');
    });

    it('should truncate beyond maxLen', function() {
      const urlSafe = new UrlSafeString({joinString: '~', maxLen: 20}),
            output  = urlSafe.generate(
              'Some_Book _Name_ _Here!',
              'Some authors-- Name',
              'Publisher ____or something..'
            );

      assert.deepEqual(output, 'somebook~name~here~s');
    });

    it('should allow upercase with lowercaseOnly set to false', function() {
      const urlSafe = new UrlSafeString({lowercaseOnly: false}),
            output  = urlSafe.generate(
              'Some_Book _Name_ _Here!',
              'Some authors-- Name',
              'Publisher ____or something..'
            );

      assert.deepEqual(output, 'SomeBook-Name-Here-Some-authors-Name-Publisher-or-something');
    });

    it('should allow additional special chars if you override regexRemovePattern', function() {
      const urlSafe = new UrlSafeString({regexRemovePattern: /((?!([a-z0-9<])).)/gi}),
            output  = urlSafe.generate(
              'Some Book Name< Here!',
              '<Some authors <Name',
              'Publisher <or something..'
            );

      assert.deepEqual(output, 'some-book-name<-here-<some-authors-<name-publisher-<or-something');
    });

    it('should remove all types of special chars', function() {
      const urlSafe = new UrlSafeString(),
            output  = urlSafe.generate(
              'The Three-Body Problem (simplified Chinese: 三体; traditional Chinese: 三體, \"Three Body\") ',
              'by Cixin Liu'
            );

      assert.deepEqual(
        output,
        'the-three-body-problem-simplified-chinese-traditional-chinese-three-body-by-cixin-liu'
      );
    });

    it('should not trim whitespace if you ask it not to', function() {
      const urlSafe = new UrlSafeString({trimWhitespace: false}),
            output = urlSafe.generate(
              ' Some Book Name Here! ',
              ' Some authors Name ',
              ' Publisher or something .. '
            );

      assert.deepEqual(output, '-some-book-name-here-some-authors-name-publisher-or-something-');
    });

    it('should blow up with no args', function() {
      const urlSafe = new UrlSafeString();

      assert.throws(urlSafe.generate, Error);
    });

    it('should blow up with on non-string args', function() {
      const urlSafe = new UrlSafeString();

      assert.throws(
        function() {
          return urlSafe.generate('string', 12345);
        }, Error
      );

      assert.throws(
        function() {
          return urlSafe.generate({});
        }, Error
      );
    });
  });
});
