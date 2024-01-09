/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    "plugin:vitest-globals/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2022: true,
    "vitest-globals/env": true,
    "cypress/globals": true,
  },
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "cypress", "prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off",
    "no-undef": process.env.NODE_ENV === "production" ? "warn" : "error",
    "no-unreachable": process.env.NODE_ENV === "production" ? "warn" : "error",
    "prettier/prettier": ["error", { singleQuote: true }],
    "react/react-in-jsx-scope": "off",
  },
};
