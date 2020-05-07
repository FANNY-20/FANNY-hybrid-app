module.exports = {
  ignoreFiles: ["node_modules", ".nuxt", "dist"],
  rules: {
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true,
    "function-calc-no-invalid": true,
    "unit-no-unknown": true,
    "property-no-unknown": true,
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: ["consecutive-duplicates-with-different-values"],
      },
    ],
    "declaration-block-no-shorthand-property-overrides": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["/^v-/"],
      },
    ],
    "selector-type-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-extra-semicolons": true,
    "shorthand-property-no-redundant-values": true,
    "declaration-no-important": true,
    "declaration-block-single-line-max-declarations": 1,
    "max-nesting-depth": [
      5,
      {
        severity: "warning",
        ignore: [
          "blockless-at-rules",
          "pseudo-classes",
        ],
      },
    ],
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "font-weight-notation": "numeric",
    "function-url-quotes": "always",
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "string-quotes": "double",
    "length-zero-no-unit": true,
    "unit-case": "lower",
    "value-keyword-case": "lower",
    "property-case": "lower",
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "block-opening-brace-space-before": "always",
    indentation: [
      2,
      {
        baseIndentLevel: 1,
      },
    ],
    linebreaks: "unix",
    "max-empty-lines": [
      2,
      {
        ignore: ["comments"],
      },
    ],
    "no-missing-end-of-source-newline": true,
  },
};
