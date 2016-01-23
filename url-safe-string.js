function UrlSafeString(options){
  var _opts = {
    maxLen: 100,                               // truncates beyond maxLen
    lowercaseOnly: true,
    regexRemovePattern: /((?!([a-z0-9])).)/gi, // matches opposite of [a-z0-9]
    joinString: '-',                           // e.g. - may be: '-', '_', '#'
    trimWhitespace: true
  }, prop;

  // vanilla shallow merge to avoid dependencies
  if(options)
    for(prop in options)
      if(Object.prototype.hasOwnProperty.call(options, prop))
        _opts[prop] = options[prop];

  return {
    generate: function generate(){
      var i, tag,
        reJoinString = new RegExp(_opts.joinString + '+', 'g'),
        args = Array.prototype.slice.call(arguments);

      if(!args || args.length === 0)
        throw new Error('generate method must take at least one argument');

      // validate, trim all arguments:
      for(i = 0; i < args.length; i++) {
        if(typeof args[i] !== 'string')
          throw new Error('all supplied arguments must be Strings');

        if(_opts.trimWhitespace)
          args[i] = args[i].trim();
      }

      // Join strings and convert whitespace between words to join string
      tag = args.join(_opts.joinString);
      tag = tag.replace(/\s/g, _opts.joinString);
      if(_opts.lowercaseOnly)
        tag = tag.toLowerCase();
      // regex away anything "unsafe", but ignore the join string!
      tag = tag.replace(_opts.regexRemovePattern, function(match){
        if(match === _opts.joinString) return match;
        return '';
      });

      // truncate in excess of maxLen
      if(tag.length > _opts.maxLen)
        tag = tag.substring(0,_opts.maxLen);

      // remove any duplicates of the join string using this pattern: /<join string>+/g
      tag = tag.replace(reJoinString, _opts.joinString);
      return tag;
    }
  };
}

module.exports = UrlSafeString;
