var UrlSafeString = require('../url-safe-string');
var assert = require('assert');

describe('UrlSafeTag', function() {
  describe('generate', function () {
    it('should generate a tag from a single String argument', function () {
      var urlSafe = new UrlSafeString();
      var testData = "Game Of Thrones: A Song of Ice and Fire";
      var output = urlSafe.generate(testData);
      assert.equal(output,'game-of-thrones-a-song-of-ice-and-fire');
    });

    it('should generate a tag from a multiple String arguments', function () {
      var urlSafe = new UrlSafeString();
      var output = urlSafe.generate(
        'Game Of Thrones:',
        'A Song of Ice and Fire',
        'By George R. R. Martin'
      );
      assert.equal(output,'game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and strip whitespace', function () {
      var urlSafe = new UrlSafeString();
      var output = urlSafe.generate(
        ' Game Of Thrones: ',
        ' A Song of Ice and Fire \n',
        '\nBy George R. R. Martin '
      );
      assert.equal(output, 'game-of-thrones-a-song-of-ice-and-fire-by-george-r-r-martin');
    });

    it('should generate a tag from a multiple String arguments and remove duplicate join strings', function () {
      var urlSafe = new UrlSafeString({
        joinString: '-'
      });
      var output = urlSafe.generate(
        'Some-Book -Name- -Here!',
        'Some authors-- Name',
        'Publisher -----or something..'
      );
      assert.equal(output, 'some-book-name-here-some-authors-name-publisher-or-something');
    });

    it('should generate a tag from a different kind of join string', function () {
      var urlSafe = new UrlSafeString({
        joinString: '_'
      });
      var output = urlSafe.generate(
        'Some_Book _Name_ _Here!',
        'Some authors-- Name',
        'Publisher ____or something..'
      );
      assert.equal(output, 'some_book_name_here_some_authors_name_publisher_or_something');
    });

    it('should truncate beyond maxLen', function () {
      var urlSafe = new UrlSafeString({
        joinString: '~',
        maxLen: 20
      });
      var output = urlSafe.generate(
        'Some_Book _Name_ _Here!',
        'Some authors-- Name',
        'Publisher ____or something..'
      );
      assert.equal(output, 'somebook~name~here~s');
    });

    it('should allow upercase with lowercaseOnly set to false', function () {
      var urlSafe = new UrlSafeString({
        lowercaseOnly: false
      });
      var output = urlSafe.generate(
        'Some_Book _Name_ _Here!',
        'Some authors-- Name',
        'Publisher ____or something..'
      );
      assert.equal(output, 'SomeBook-Name-Here-Some-authors-Name-Publisher-or-something');
    });

    it('should allow additional special chars if you override regexRemovePattern', function () {
      var urlSafe = new UrlSafeString({
        regexRemovePattern: /((?!([a-z0-9<])).)/gi
      });
      var output = urlSafe.generate(
        'Some Book Name< Here!',
        '<Some authors <Name',
        'Publisher <or something..'
      );
      assert.equal(output, 'some-book-name<-here-<some-authors-<name-publisher-<or-something');
    });

    it('should remove all types of special chars', function () {
      var urlSafe = new UrlSafeString();
      var output = urlSafe.generate(
        'The Three-Body Problem (simplified Chinese: 三体; traditional Chinese: 三體, \"Three Body\") ',
        'by Cixin Liu'
      );
      assert.equal(
        output,
        'the-three-body-problem-simplified-chinese-traditional-chinese-three-body-by-cixin-liu'
      );
    });

    it('should not trim whitespace if you ask it not to', function () {
      var urlSafe = new UrlSafeString({
        trimWhitespace: false
      });
      var output = urlSafe.generate(
        ' Some Book Name Here! ',
        ' Some authors Name ',
        ' Publisher or something .. '
      );
      assert.equal(output, '-some-book-name-here-some-authors-name-publisher-or-something-');
    });

  });
});
