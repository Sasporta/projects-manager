import { pathsToModuleNameMapper } from 'ts-jest';
import type { JestConfigWithTsJest } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  coverageReporters: ['text-summary'],
  collectCoverageFrom: ['src/routes/**'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default jestConfig;
