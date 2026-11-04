import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "@labirthermal/react",
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
