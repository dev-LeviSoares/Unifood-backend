import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.spec.ts"],
          exclude: ["src/**/*.e2e.spec.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "e2e",
          include: ["src/**/*.e2e.spec.ts"],
          environment:
            "./prisma/vitest-environment-prisma/prisma-test-environment.ts",
        },
      },
    ],
  },
});