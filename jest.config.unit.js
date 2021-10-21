const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testMatch: [
    "<rootDir>/__tests__/unit/**/(*.)+(spec|test).[jt]s?(x)",
  ],
};
