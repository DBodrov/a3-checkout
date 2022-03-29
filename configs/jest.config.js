process.env.NODE_ENV = 'test';

module.exports = {
  rootDir: '../',
  roots: ['src'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  verbose: true,
  testMatch: ['**/src/**/?(*.)+(test).[jt]s?(x)'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^src/(.*)': '<rootDir>/src/$1',
    '^assets/(.*)': '<rootDir>/src/assets/$1',
    '^screens/(.*)': '<rootDir>/src/screens/$1',
    '^context/(.*)': '<rootDir>/src/context/$1',
    '^context': '<rootDir>/src/context',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
  },
  snapshotSerializers: ['@emotion/jest'],
  setupFiles: [require.resolve('whatwg-fetch')],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve('react-scripts/config/jest/babelTransform'),
    '^.+\\.css$': require.resolve('react-scripts/config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
      'react-scripts/config/jest/fileTransform.js',
    ),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/configs/setupTests.js'],
  testEnvironment: 'jest-environment-jsdom'
};
