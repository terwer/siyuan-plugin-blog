module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "turbo", "prettier"],

  // pnpm add eslint-plugin-react -D
  // pnpm add eslint-config-next -D
  // extends: ["next", "turbo", "prettier"],
  // rules: {
  //   "@next/next/no-html-link-for-pages": "off",
  // },

  // parser: "vue-eslint-parser",
  // parser: "@typescript-eslint/parser",
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "@typescript-eslint/no-this-alias": "off",
    "prettier/prettier": "error",
  },
  parserOptions: {
    // 下面一行next项目可用，参考web
    // babelOptions: {
    //   presets: [require.resolve("next/babel")],
    // },
  },
  plugins: ["@typescript-eslint", "prettier"],
}
