module.exports = {
  root: true,
  extends: ["eslint:recommended", "turbo", "prettier", "@nuxt/eslint-config"],

  plugins: ["prettier"],

  overrides: [
    // 下面的配置可重写 Vue
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      // Parse the script in `.vue` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "prettier/prettier": "error",
    "prefer-const": "warn",
    "turbo/no-undeclared-env-vars": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multi-word-component-names": "off",
  },
}
