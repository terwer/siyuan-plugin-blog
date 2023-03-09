module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json"],
  },

  plugins: ["@typescript-eslint"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/quotes": ["error", "double"],
  },
}
