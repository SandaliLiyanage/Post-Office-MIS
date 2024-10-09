import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  // Add the 'transform' section
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Ensure Jest recognizes TypeScript and JS files
  testEnvironment: "node", // Keep using the 'jest-environment-node' as per your configuration
  transformIgnorePatterns: [
    "\\\\node_modules\\\\", // Ensure that node_modules are not transformed
    "\\.pnp\\.[^\\\\]+$"
  ],
};

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/singleton.ts'],
}

export default config;