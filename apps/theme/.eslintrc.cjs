module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json"],
    extraFileExtensions: [".vue"],
  },

  ignorePatterns: ["node_modules/", ".vercel/", ".idea/", "lib/", "*.js", "*.d.ts", "*.mts", "*.map"],

  plugins: ["@typescript-eslint", "prettier"],

  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    semi: "off",
    quotes: "off",
    "@typescript-eslint/no-this-alias": "off",
    "prettier/prettier": "error",
  },
}
