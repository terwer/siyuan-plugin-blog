const sharedConfig = require("jest-config-custom")

// https://jestjs.io/docs/
module.exports = {
  ...sharedConfig,
  rootDir: "./",
  testEnvironment: "node",
  // https://github.com/facebook/jest/issues/3094#issuecomment-385164816
  // https://jestjs.io/docs/webpack#handling-static-assets
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.cjs',
    '\\.(css|styl)$': '<rootDir>/__mocks__/styleMock.cjs',
  },
}