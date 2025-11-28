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
    "import viteReact from '@vitejs/plugin-react'",
    "import { TanStackRouterVite } from '@tanstack/router-plugin/vite'",
    "import { defineConfig } from 'vite'",
  ];
  const plugins = ["TanStackRouterVite()", "viteReact()"];

  if (features.includes("ui")) {
    imports.push("import tailwindcss from '@tailwindcss/vite'");
    plugins.push("tailwindcss()");
  }

  if (features.includes("deploy")) {
    imports.push("import { cloudflare } from '@cloudflare/vite-plugin'");
    plugins.push("cloudflare()");
  }

  if (features.includes("i18n")) {
    imports.push(
      "import { paraglide } from '@inlang/paraglide-js-adapter-vite'"
    );
    plugins.push(
      "paraglide({ project: './project.inlang', outdir: './src/paraglide' })"
    );
  }

  return `${imports.join("\n")}

export default defineConfig({
  plugins: [
    ${plugins.join(",\n    ")}
  ],
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

  // tailwind.config.js (if UI is selected)
  if (features.includes("ui")) {
    fs.writeFileSync(
      path.join(root, "tailwind.config.js"),
      `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
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
