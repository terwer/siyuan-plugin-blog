module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "turbo",
    "prettier",
  ],

  // 这里是next的配置支持，需要在子项目安装下列依赖
  // pnpm add @babel/core@^7.0.0 -D
  // pnpm add next@^13.1.1
  // pnpm add react@18.2.0
  // pnpm add react-dom@18.2.0
  //
  // 然后再本项目安装以下依赖
  // pnpm add eslint-plugin-react -D
  // pnpm add eslint-config-next -D
  //
  // extends: ["next"],
  // rules: {
  //   "@next/next/no-html-link-for-pages": "off",
  // },

  // https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    // 下面一行next项目可用，参考web
    // babelOptions: {
    //   presets: [require.resolve("next/babel")],
    // },
  },

  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],

  plugins: ["@typescript-eslint", "vue", "prettier"],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": "error",
  },
}
