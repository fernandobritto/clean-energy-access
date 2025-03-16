export default {
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.spec.ts'],
  moduleNameMapper: {
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@functions/(.*)': '<rootDir>/src/functions/$1',
    '@tests/(.*)': '<rootDir>/tests/$1'
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.serverless/', '/.webpack/'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest'
  }
}
