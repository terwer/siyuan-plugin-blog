module.exports = {
  root: true,
  extends: ["eslint:recommended", "turbo", "prettier", "@nuxt/eslint-config"],

  plugins: ["prettier"],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "prettier/prettier": "error",
    "turbo/no-undeclared-env-vars": "off",
    "vue/max-attributes-per-line": "off",
  },
}
