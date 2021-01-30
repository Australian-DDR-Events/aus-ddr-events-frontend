module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.tsx'],
  testMatch: ['**/*.test.{tsx, ts}'],
  moduleDirectories: ['src', 'node_modules'],
};
