'use strict';

function UrlSafeString(options) {
  const _opts = {
    maxLen:             100,                   // truncates beyond maxLen
    lowercaseOnly:      true,
    regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
    joinString:         '-',                   // e.g. - may be: '-', '_', '#'
    trimWhitespace:     true
  };

  // Vanilla shallow merge to avoid dependencies
  if (options)
    for (const prop in options)
      if (Object.prototype.hasOwnProperty.call(options, prop))
        _opts[prop] = options[prop];

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

      return tag;
    }
  };
}

module.exports = UrlSafeString;
