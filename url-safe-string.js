'use strict';

var defaultTransliterations = {
  'ä': 'ae', 'Ä': 'Ae',
  'ö': 'oe', 'Ö': 'Oe',
  'ü': 'ue', 'Ü': 'Ue',
  'ß': 'ss',
  'à': 'a',  'á': 'a',  'â': 'a',  'ã': 'a',  'å': 'a',
  'À': 'A',  'Á': 'A',  'Â': 'A',  'Ã': 'A',  'Å': 'A',
  'è': 'e',  'é': 'e',  'ê': 'e',  'ë': 'e',
  'È': 'E',  'É': 'E',  'Ê': 'E',  'Ë': 'E',
  'ì': 'i',  'í': 'i',  'î': 'i',  'ï': 'i',
  'Ì': 'I',  'Í': 'I',  'Î': 'I',  'Ï': 'I',
  'ò': 'o',  'ó': 'o',  'ô': 'o',  'õ': 'o',
  'Ò': 'O',  'Ó': 'O',  'Ô': 'O',  'Õ': 'O',
  'ù': 'u',  'ú': 'u',  'û': 'u',
  'Ù': 'U',  'Ú': 'U',  'Û': 'U',
  'ñ': 'n',  'Ñ': 'N',
  'ç': 'c',  'Ç': 'C',
  'ð': 'd',  'Ð': 'D',
  'ý': 'y',  'ÿ': 'y',  'Ý': 'Y',
  'æ': 'ae', 'Æ': 'AE',
  'ø': 'o',  'Ø': 'O',
  'þ': 'th', 'Þ': 'Th',
  'ł': 'l',  'Ł': 'L',
  'đ': 'd',  'Đ': 'D',
  'ś': 's',  'Ś': 'S',
  'ź': 'z',  'Ź': 'Z',
  'ż': 'z',  'Ż': 'Z',
  'ć': 'c',  'Ć': 'C',
  'ń': 'n',  'Ń': 'N',
  'ą': 'a',  'Ą': 'A',
  'ę': 'e',  'Ę': 'E',
  'č': 'c',  'Č': 'C',
  'š': 's',  'Š': 'S',
  'ž': 'z',  'Ž': 'Z',
  'ř': 'r',  'Ř': 'R',
  'ě': 'e',  'Ě': 'E',
  'ů': 'u',  'Ů': 'U',
  'ț': 't',  'Ț': 'T',
  'ș': 's',  'Ș': 'S'
};

function UrlSafeString(options) {
  const _opts = {
    maxLen:             100,                   // truncates beyond maxLen
    lowercaseOnly:      true,
    regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
    joinString:         '-',                   // e.g. - may be: '-', '_', '#'
    trimWhitespace:     true,
    trimResult:         true,
    transliterate:      true
  };

  // Vanilla shallow merge to avoid dependencies (except transliterations which is deep-merged)
  if (options)
    for (const prop in options)
      if (Object.prototype.hasOwnProperty.call(options, prop))
        _opts[prop] = options[prop];

  // Build the transliteration map: defaults + any user overrides
  var _transliterations = {};
  var key;
  for (key in defaultTransliterations)
    if (Object.prototype.hasOwnProperty.call(defaultTransliterations, key))
      _transliterations[key] = defaultTransliterations[key];
  if (options && options.transliterations)
    for (key in options.transliterations)
      if (Object.prototype.hasOwnProperty.call(options.transliterations, key))
        _transliterations[key] = options.transliterations[key];

  return {
    generate: function generate() {
      const reJoinString = new RegExp(_opts.joinString + '+', 'g'),
            args         = Array.prototype.slice.call(arguments);

      let tag;

      if ( ! args || args.length === 0)
        throw new Error('generate method must be passed at least one argument');

      // Validate, trim all arguments:
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] !== 'string')
          throw new Error('all supplied arguments must be Strings');

        if (_opts.trimWhitespace)
          args[i] = args[i].trim();
      }

      // Join strings and convert whitespace between words to join string
      tag = args.join(_opts.joinString);
      tag = tag.replace(/\s/g, _opts.joinString);
      if (_opts.lowercaseOnly)
        tag = tag.toLowerCase();

      // Transliterate accented/special characters to ASCII equivalents
      if (_opts.transliterate) {
        var result = '';
        for (var ci = 0; ci < tag.length; ci++) {
          var ch = tag[ci];
          result += Object.prototype.hasOwnProperty.call(_transliterations, ch) ? _transliterations[ch] : ch;
        }
        tag = result;
      }

      // Regex away anything "unsafe", but ignore the join string!
      tag = tag.replace(_opts.regexRemovePattern, function(match) {
        if (match === _opts.joinString)
          return match;

        return '';
      });

      // Truncate in excess of maxLen
      if (tag.length > _opts.maxLen)
        tag = tag.substring(0,_opts.maxLen);

      // Remove any duplicates of the join string using this pattern: /<join string>+/g
      tag = tag.replace(reJoinString, _opts.joinString);

      // Strip leading/trailing join strings
      if (_opts.trimResult) {
        while (tag.length > 0 && tag[0] === _opts.joinString)
          tag = tag.substring(1);
        while (tag.length > 0 && tag[tag.length - 1] === _opts.joinString)
          tag = tag.substring(0, tag.length - 1);
      }

      return tag;
    }
  };
}

// Static convenience method using default options
UrlSafeString.generate = function() {
  var instance = new UrlSafeString();
  return instance.generate.apply(instance, arguments);
};

module.exports = UrlSafeString;
