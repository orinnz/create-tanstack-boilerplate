import fs from "node:fs";
import path from "node:path";

export function createTestingSetup(root) {
  fs.writeFileSync(
    path.join(root, "vitest.config.ts"),
    `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
})
`,
  );

  fs.mkdirSync(path.join(root, "tests"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "tests/setup.ts"),
    `import '@testing-library/jest-dom'
`,
  );
}
