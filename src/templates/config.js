export function getViteConfig(features) {
  // Base Vite config with TanStack Start and TypeScript path support
  const baseConfig = `import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import viteReact from "@vitejs/plugin-react"
${features.includes('ui') ? 'import tailwindcss from "@tailwindcss/vite"' : ''}
${features.includes('deploy') ? "import { cloudflare } from '@cloudflare/vite-plugin'" : ''}
${features.includes('i18n') ? 'import { paraglideVitePlugin } from "@inlang/paraglide-js"' : ''}

export default defineConfig({
  plugins: [
    ${features.includes('i18n') ? `paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      cookieName: "PARAGLIDE_LOCALE",
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["vi", "/vi/:path(.*)?"],
            ["en", "/en/:path(.*)?"],
          ],
        },
      ],
    }),` : ''}
    tsconfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    viteReact(),
    ${features.includes('ui') ? 'tailwindcss(),' : ''}
    ${features.includes('deploy') ? 'cloudflare({ viteEnvironment: { name: "ssr" } }),' : ''}
  ],
  ${features.includes('deploy') ? `build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
      onLog(level, log, handler) {
        if (log.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        handler(level, log);
      },
    },
  },` : ''}
});
`;
  return baseConfig;
}

export function getGitignore() {
  return `# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
.output
.vinxi
.nitro

# Misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDE
.vscode
.idea
*.swp
*.swo
*~

# TanStack
.tanstack
routeTree.gen.ts
`;
}
