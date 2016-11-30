# url-safe-string
[![Build Status](https://travis-ci.org/a-r-d/url-safe-string.svg?branch=master)](https://travis-ci.org/a-r-d/url-safe-string) [![npm version](https://badge.fury.io/js/url-safe-string.svg)](https://badge.fury.io/js/url-safe-string)

Dependency free node module to convert strings to URL-safe tags for client side routing, SEO purposes, or, whatever else.

## About

This module has no dependencies, is written in vanilla JavaScript and the newest features it uses are in ES5 (String.prototype.trim(), which happens to be optional). It should work in just about any browser, has a small
footprint and is meant to be used with frameworks such as AngularJS. The module is also fully tested.


### Warning

This module uses new ECMAScript 2015 (aka ES6) Syntax "const" and "let". Please use it with node 4 or above or transpile it before using it in a browser. If you want to write a babel post-install npm script I'll accept the PR :)

You can also ref the 1.0.0 version if you need the older syntax for the browser.



## Install

```bash
npm install --save url-safe-string
```

## Usage

```javascript
const UrlSafeString = require('url-safe-string'),
      tagGenerator  = new UrlSafeString();

let tag = tagGenerator.generate('Some Book Name Here!', 'Some authors Name', 'Publisher or something...');

// tag value --> 'some-book-name-here-some-authors-name-publisher-or-something'
```

## options

These are the default options, which can all be overriden by passing an object into the constructor.

```javascript
// Configured Defaults:
const _opts = {
  maxLen:             100,                   // truncates beyond maxLen
  lowercaseOnly:      true,
  regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
  joinString:         '-',                   // e.g. - may be: '-', '_', '#'
  trimWhitespace:     true
}

// Call constructor with custom options:
const urlSafeTag = new UrlSafeTag({
  maxLen:        50,
  lowercaseOnly: false
});
```

## Tests

This module has a test suite, it uses mocha which is installed via dev dependencies. You can run it using npm scripts:
```bash
npm run test
```
