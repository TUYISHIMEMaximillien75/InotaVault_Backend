  import type { Config } from "jest";

  const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: ".",
    testMatch: ["**/tests/**/*.test.ts"],
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts",
      "!src/server.ts",
      "!src/database/**",
      "!src/config/**"
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
    setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  };

  export default config;
