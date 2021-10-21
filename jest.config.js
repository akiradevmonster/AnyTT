/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

const pathIgnorePatterns = ['<rootDir>/.git/', '<rootDir>/.next/'];
const nodeModulesPattern = '<rootDir>/node_modules/';
const autoFixTempPattern = '/auto_fix_';

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'node',
  testMatch: ['/* @override: No match defaults, Override if needed. */'],
  setupFilesAfterEnv: ['./jest.setup.js', './jest.setup.ts'],
  testPathIgnorePatterns: [...pathIgnorePatterns, nodeModulesPattern, autoFixTempPattern],
  transformIgnorePatterns: [...pathIgnorePatterns, nodeModulesPattern],
  watchPathIgnorePatterns: [...pathIgnorePatterns, nodeModulesPattern],
  modulePathIgnorePatterns: pathIgnorePatterns,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig-jest.json',
    },
  },
};
