module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/strongly-recommended",
  ],
  plugins: [
    "vue",
  ],
  rules: {
    "semi": ["error", "always"],
    "curly": "error",
    "indent": ["error", 2, {
      "SwitchCase": 1,
    }],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
    }],
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "no-console": "off",
    "no-debugger": "off",
    "array-bracket-newline": ["error", "consistent"],
    "array-element-newline": ["error", "consistent"],
    "object-curly-newline": ["error", {
      "consistent": true,
      "multiline": true,
    }],
    "object-curly-spacing": ["error", "always"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true,
    }],
    "brace-style": ["error", "1tbs"],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always",
    }],
    "space-in-parens": ["error", "never"],
    "spaced-comment": ["error", "always"],
    "switch-colon-spacing": ["error", {
      "after": true,
      "before": false,
    }],
    "comma-spacing": ["error", {
      "before": false,
      "after": true,
    }],
    "quotes": ["error", "double", {
      "avoidEscape": true,
      "allowTemplateLiterals": true,
    }],
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxBOF": 0,
      "maxEOF": 1,
    }],
    "eol-last": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 1,
    }],
    "vue/order-in-components": ["error", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        [
          "delimiters",
          "comments",
        ],
        [
          "components",
          "directives",
          "filters",
        ],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        "head",
        [
          "props",
          "propsData",
        ],
        "data",
        "computed",
        "watch",
        "methods",
        "LIFECYCLE_HOOKS",
        [
          "template",
          "render",
        ],
        "renderError",
      ],
    }],
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off",
      },
    },
  ],
};
