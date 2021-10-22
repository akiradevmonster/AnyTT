const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  testEnvironment: './jest.env.mongo.js',
  testMatch: [
    "<rootDir>/__tests__/data/**/(*.)+(spec|test).[jt]s?(x)",
  ],
  setupFilesAfterEnv: [
    ...baseConfig.setupFilesAfterEnv,
    './jest.setupAfterEnv.mongo.ts',
  ],
};
