interface UrlSafeStringOptions {
  /** Maximum length of the generated string. Default: 100 */
  maxLen?: number;
  /** Convert to lowercase. Default: true */
  lowercaseOnly?: boolean;
  /** Regex pattern to remove characters. Default: /((?!([a-z0-9])).)/gi */
  regexRemovePattern?: RegExp;
  /** String used to join words. Default: '-' */
  joinString?: string;
  /** Trim whitespace from input strings. Default: true */
  trimWhitespace?: boolean;
  /** Strip leading/trailing join strings from the result. Default: true */
  trimResult?: boolean;
  /** Transliterate accented/special characters to ASCII equivalents (e.g. ö -> oe, ñ -> n). Default: true */
  transliterate?: boolean;
  /** Custom transliteration map merged on top of the defaults (e.g. { '&': 'and', '@': 'at' }) */
  transliterations?: Record<string, string>;
}

interface UrlSafeStringInstance {
  /** Generate a URL-safe string from one or more input strings */
  generate(...args: string[]): string;
}

interface UrlSafeStringConstructor {
  new (options?: UrlSafeStringOptions): UrlSafeStringInstance;
  (options?: UrlSafeStringOptions): UrlSafeStringInstance;
  /** Static convenience method using default options */
  generate(...args: string[]): string;
}

declare const UrlSafeString: UrlSafeStringConstructor;

export = UrlSafeString;
