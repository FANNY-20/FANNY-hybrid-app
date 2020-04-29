/**
 * @see https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "avoid",
  rangeStart: 0,
  rangeEnd: Infinity,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  overrides: [
    {
      files: ["*.tpl"],
      options: {
        parser: "html",
      },
    },
  ],
};
