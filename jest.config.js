module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  testMatch: ['**/*.test.{tsx, ts}'],
  moduleDirectories: ['src', 'node_modules'],
};
