import fs from "node:fs";
import path from "node:path";

export function getGitignore() {
  return `node_modules
dist
.vinxi
.output
.vercel
.netlify
.wrangler
.env
.DS_Store
`;
}

function getViteConfig(features) {
  const imports = [
    "import { cloudflare } from '@cloudflare/vite-plugin'",
    "import { paraglideVitePlugin } from '@inlang/paraglide-js'",
    "import tailwindcss from '@tailwindcss/vite'",
    "import { tanstackStart } from '@tanstack/react-start/plugin/vite'",
    "import viteReact from '@vitejs/plugin-react'",
    "import { defineConfig } from 'vite'",
    "import viteTsConfigPaths from 'vite-tsconfig-paths'",
  ];

  const plugins = [];

  if (features.includes("i18n")) {
    plugins.push(`paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["vi", "/vi/:path(.*)?"],
            ["en", "/en/:path(.*)?"],
          ],
        },
      ],
    })`);
  }

  plugins.push("viteTsConfigPaths()");
  plugins.push("tanstackStart()");
  plugins.push("viteReact()");

  if (features.includes("ui")) {
    plugins.push("tailwindcss()");
  }

  if (features.includes("deploy")) {
    plugins.push("cloudflare({ viteEnvironment: { name: 'ssr' } })");
  }

  // Filter out unused imports
  const usedImports = imports.filter((imp) => {
    if (imp.includes("cloudflare") && !features.includes("deploy")) return false;
    if (imp.includes("paraglide") && !features.includes("i18n")) return false;
    if (imp.includes("tailwindcss") && !features.includes("ui")) return false;
    return true;
  });

  return `${usedImports.join("\n")}

export default defineConfig({
  plugins: [
    ${plugins.join(",\n    ")}
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      onLog(level, log, handler) {
        if (log.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        handler(level, log);
      },
    },
  },
})
`;
}

export function createConfigFiles(root, features, projectName) {
  // tsconfig.json
  fs.writeFileSync(
    path.join(root, "tsconfig.json"),
    JSON.stringify(
      {
        include: ["**/*.ts", "**/*.tsx"],
        compilerOptions: {
          strict: true,
          esModuleInterop: true,
          jsx: "react-jsx",
          module: "ESNext",
          moduleResolution: "Bundler",
          lib: ["DOM", "DOM.Iterable", "ES2023"],
          isolatedModules: true,
          resolveJsonModule: true,
          skipLibCheck: true,
          target: "ES2022",
          allowJs: true,
          forceConsistentCasingInFileNames: true,
          baseUrl: ".",
          paths: {
            "@/*": ["./src/*"],
          },
          types: features.includes("testing")
            ? ["vitest/globals", "@testing-library/jest-dom"]
            : [],
          noEmit: true,
        },
      },
      null,
      2,
    ),
  );

  // vite.config.ts
  fs.writeFileSync(path.join(root, "vite.config.ts"), getViteConfig(features));

  // tailwind.config.ts (if UI is selected)
  if (features.includes("ui")) {
    fs.writeFileSync(
      path.join(root, "tailwind.config.ts"),
      `import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
`,
    );
  }

  // .env.example
  fs.writeFileSync(
    path.join(root, ".env.example"),
    `VITE_APP_TITLE="My TanStack App"`,
  );

  // wrangler.jsonc (if deploy feature is selected)
  if (features.includes("deploy")) {
    fs.writeFileSync(
      path.join(root, "wrangler.jsonc"),
      JSON.stringify(
        {
          $schema: "node_modules/wrangler/config-schema.json",
          name: projectName,
          compatibility_date: "2025-02-14",
          compatibility_flags: ["nodejs_compat"],
          main: "./src/server.ts",
          vars: {},
        },
        null,
        2,
      ),
    );
  }
}
