/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
      // babelConfig: true
    }
  },
  testEnvironment: 'node',
  verbose: true,
  coverageReporters: ["json", "html", "lcov"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  testPathIgnorePatterns: [
  ],
  coveragePathIgnorePatterns: [
  ],
  testTimeout: 35000

};
