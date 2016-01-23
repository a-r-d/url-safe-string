# url-safe-string

Dependency free node module to convert strings to URL-safe tags for client side routing, SEO purposes, or, whatever else.

## About

This module has no dependencies, is written in vanilla JavaScript and the newest features it uses are in ES5 (String.prototype.trim(), which happens to be optional). It should work in just about any browser, has a small
footprint and is meant to be used with frameworks such as AngularJS. The module is also fully tested.


## Install

```
npm install --save url-safe-string
```

## Usage

```javascript
var UrlSafeString = require('string-safe-string');

var tagGenerator = new UrlSafeString();
var tag = tagGenerator.generate('Some Book Name Here!', 'Some authors Name', 'Publisher or something...');

// tag value --> 'some-book-name-here-some-authors-name-publisher-or-something'

```

## options

These are the default options, which can all be overriden by passing an object into the constructor.

```javascript
// Configured Defaults:
var _opts = {
  maxLen: 100,                               // truncates beyond maxLen
  lowercaseOnly: true,
  regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
  joinString: '-',                           // e.g. - may be: '-', '_', '#'
  trimWhitespace: true
}

// Call constructor with custom options:
var urlSafeTag = new UrlSafeTag({
  maxLen: 50,
  lowercaseOnly: false
});

```

## Tests

This module has a test suite. Test it with mocha:

```
npm install -g mocha
mocha test
```
