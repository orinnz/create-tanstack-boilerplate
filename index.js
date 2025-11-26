#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bold, cyan, green, red, reset, yellow } from "kolorist";
import prompts from "prompts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Banner
console.log(cyan(bold("\n🚀 Create TanStack Start Boilerplate\n")));

const FEATURES = {
  i18n: {
    name: "Internationalization (i18n)",
    description: "Multi-language support with Inlang/Paraglide",
    packages: ["@inlang/cli", "@inlang/paraglide-js"],
    devPackages: [],
  },
  ui: {
    name: "UI Components",
    description: "Radix UI + Tailwind CSS + shadcn/ui",
    packages: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-slot",
      "@radix-ui/react-tooltip",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    devPackages: ["@tailwindcss/vite", "tailwindcss", "autoprefixer"],
  },
  state: {
    name: "State Management",
    description: "Choose Jotai or Zustand for state management",
    packages: [],
    devPackages: [],
  },
  auth: {
    name: "Authentication",
    description: "Google OAuth integration",
    packages: ["cookie-es"],
    devPackages: ["@types/google.accounts"],
  },
  animation: {
    name: "Animations",
    description: "Framer Motion for smooth animations",
    packages: ["framer-motion"],
    devPackages: [],
  },
  testing: {
    name: "Testing Setup",
    description: "Vitest + Testing Library",
    packages: [],
    devPackages: [
      "@testing-library/jest-dom",
      "@testing-library/react",
      "@testing-library/user-event",
      "@vitest/ui",
      "vitest",
      "jsdom",
    ],
  },
  quality: {
    name: "Code Quality",
    description: "Biome (linter/formatter) + Husky + lint-staged",
    packages: [],
    devPackages: ["@biomejs/biome", "husky", "lint-staged"],
  },
  deploy: {
    name: "Cloudflare Deployment",
    description: "Deploy to Cloudflare Pages using @cloudflare/vite-plugin",
    packages: ["@cloudflare/vite-plugin"],
    devPackages: ["wrangler"],
  },
};

async function init() {
  let result = {};

  try {
    result = await prompts(
      [
        {
          type: "text",
          name: "projectName",
          message: "Project name:",
          initial: "my-tanstack-app",
          validate: (name) => {
            if (!name) return "Project name is required";
            if (!/^[a-z0-9-_]+$/i.test(name)) {
              return "Project name can only contain letters, numbers, dashes and underscores";
            }
            return true;
          },
        },
        {
          type: "select",
          name: "packageManager",
          message: "Select a package manager:",
          choices: [
            { title: "pnpm", value: "pnpm" },
            { title: "npm", value: "npm" },
            { title: "yarn", value: "yarn" },
          ],
          initial: 0,
        },
        {
          type: "multiselect",
          name: "features",
          message: "Select features to include:",
          choices: Object.entries(FEATURES).map(([key, feature]) => ({
            title: feature.name,
            value: key,
            description: feature.description,
            selected: ["ui", "quality"].includes(key), // Default selections
          })),
          hint: "- Space to select. Return to submit",
        },
        {
          type: (prev, values) =>
            values.features.includes("state") ? "multiselect" : null,
          name: "stateLibs",
          message: "Select state management library:",
          choices: [
            { title: "Jotai", value: "jotai", selected: true },
            { title: "Zustand", value: "zustand" },
          ],
          hint: "- Space to select. Return to submit",
          validate: (value) =>
            !value || value.length === 0
              ? "Please select at least one state library"
              : true,
        },
        {
          type: (prev, values) =>
            values.features.includes("i18n") ? "multiselect" : null,
          name: "languages",
          message: "Select languages to support:",
          choices: [
            { title: "English", value: "en", selected: true },
            { title: "Vietnamese", value: "vi", selected: true },
            { title: "Japanese", value: "ja" },
            { title: "Korean", value: "ko" },
            { title: "Chinese (Simplified)", value: "zh" },
          ],
          hint: "- Space to select. Return to submit",
        },
        {
          type: (prev, values) =>
            values.features.includes("i18n") ? "select" : null,
          name: "baseLocale",
          message: "Select base/default language:",
          choices: (prev, values) => {
            const selected = values.languages || ["en"];
            return selected.map((lang) => ({
              title:
                lang === "en"
                  ? "English"
                  : lang === "vi"
                    ? "Vietnamese"
                    : lang === "ja"
                      ? "Japanese"
                      : lang === "ko"
                        ? "Korean"
                        : lang === "zh"
                          ? "Chinese (Simplified)"
                          : lang,
              value: lang,
            }));
          },
        },
        {
          type: "confirm",
          name: "initGit",
          message: "Initialize git repository?",
          initial: true,
        },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  const {
    projectName,
    packageManager,
    features = [],
    languages = ["en"],
    baseLocale = "en",
    initGit,
    stateLibs = ["jotai"],
  } = result;

  const root = path.join(process.cwd(), projectName);

  // Check if directory exists
  if (fs.existsSync(root)) {
    console.log(red(`\n✖ Directory ${projectName} already exists!\n`));
    process.exit(1);
  }

  console.log(cyan("\n📦 Creating project structure...\n"));

  // Create project directory
  fs.mkdirSync(root, { recursive: true });

  // Generate package.json
  const packageJson = generatePackageJson(
    projectName,
    features,
    packageManager,
    stateLibs,
  );
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );

  // Create base structure
  createBaseStructure(root);

  // Create feature-specific files
  if (features.includes("i18n")) {
    createI18nSetup(root, languages, baseLocale);
  }

  if (features.includes("ui")) {
    createUISetup(root);
  }

  if (features.includes("state")) {
    createStateSetup(root, stateLibs);
  }

  if (features.includes("auth")) {
    createAuthSetup(root);
  }

  if (features.includes("testing")) {
    createTestingSetup(root);
  }

  if (features.includes("quality")) {
    createQualitySetup(root);
  }

  // Create config files
  createConfigFiles(root, features);

  // Create README
  createReadme(root, projectName, features, packageManager);

  // Initialize git
  if (initGit) {
    console.log(yellow("\n📝 Initializing git repository...\n"));
    fs.writeFileSync(path.join(root, ".gitignore"), getGitignore());
  }

  // Success message
  console.log(green(bold("\n✓ Project created successfully!\n")));
  console.log(cyan("Next steps:\n"));
  console.log(`  cd ${projectName}`);
  console.log(`  ${packageManager} install`);
  console.log(
    `  ${packageManager} ${packageManager === "npm" ? "run " : ""}dev\n`,
  );

  if (features.includes("i18n")) {
    console.log(
      yellow("📝 Note: Run i18n setup after installing dependencies:"),
    );
    console.log(
      `  ${packageManager} ${packageManager === "npm" ? "run " : ""}machine-translate\n`,
    );
  }
}

function generatePackageJson(name, features, packageManager, stateLibs = ["jotai"]) {
  const pkg = {
    name,
    private: true,
    sideEffects: false,
    type: "module",
    scripts: {
      dev: "vite dev --port 3000",
      build: "vite build",
      start: "node .output/server/index.mjs",
    },
    dependencies: {
      "@tanstack/react-query": "^5.83.0",
      "@tanstack/react-router": "1.121.0",
      "@tanstack/react-router-with-query": "1.121.0",
      react: "^19.1.0",
      "react-dom": "^19.1.0",
      vite: "^6.3.5",
    },
    devDependencies: {
      "@tanstack/react-start": "1.121.0",
      "@tanstack/router-core": "1.121.0",
      "@tanstack/start-client-core": "1.121.0",
      "@types/node": "^24.0.0",
      "@types/react": "^19.1.7",
      "@types/react-dom": "^19.1.6",
      "vite-tsconfig-paths": "^5.1.4",
      "@vitejs/plugin-react": "^5.0.4",
      typescript: "^5.8.3",
    },
  };

  // Add feature-specific packages
  features.forEach((feature) => {
    const featureConfig = FEATURES[feature];
    if (featureConfig) {
      featureConfig.packages.forEach((p) => {
        pkg.dependencies[p] = "latest";
      });
      featureConfig.devPackages.forEach((p) => {
        pkg.devDependencies[p] = "latest";
      });
    }
  });

  if (features.includes("state")) {
    if (stateLibs.includes("jotai")) {
      pkg.dependencies["jotai"] = "latest";
    }
    if (stateLibs.includes("zustand")) {
      pkg.dependencies["zustand"] = "latest";
    }
  }

  // Add feature-specific scripts
  if (features.includes("i18n")) {
    pkg.scripts["machine-translate"] =
      "inlang machine translate --project project.inlang";
  }

  if (features.includes("testing")) {
    pkg.scripts.test = "vitest run";
    pkg.scripts["test:watch"] = "vitest";
    pkg.scripts["test:ui"] = "vitest --ui";
  }

  if (features.includes("quality")) {
    pkg.scripts.lint = `${packageManager === "pnpm" ? "pnpm " : ""}biome check src`;
    pkg.scripts["lint:fix"] =
      `${packageManager === "pnpm" ? "pnpm " : ""}biome check --write src`;
    pkg.scripts.prepare = "husky";
    pkg["lint-staged"] = {
      "*.{js,jsx,ts,tsx}": [
        `${packageManager === "pnpm" ? "pnpm " : ""}biome check src`,
      ],
    };
  }

  if (packageManager === "pnpm") {
    pkg.pnpm = {
      overrides: {
        "@tanstack/react-start-server": "1.121.0",
        "@tanstack/start-server-core": "1.121.0",
        "@tanstack/start-plugin-core": "1.121.0",
        "@tanstack/react-start-plugin": "1.121.0",
        "@tanstack/router-plugin": "1.121.0",
        "@tanstack/router-generator": "1.121.0",
        "@tanstack/server-functions-plugin": "1.121.0",
      },
    };
  }

  return pkg;
}

function createBaseStructure(root) {
  const dirs = [
    "src",
    "src/routes",
    "src/components",
    "src/utils",
    "src/styles",
    "public",
  ];

  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(root, dir), { recursive: true });
  });

  // Create basic files
  fs.writeFileSync(path.join(root, "src/client.tsx"), getClientCode());
  fs.writeFileSync(path.join(root, "src/server.ts"), getSSRCode());
  fs.writeFileSync(path.join(root, "src/router.tsx"), getRouterCode());

  fs.writeFileSync(
    path.join(root, "src/routes/__root.tsx"),
    getRootRouteCode(),
  );

  fs.writeFileSync(
    path.join(root, "src/routes/index.tsx"),
    getIndexRouteCode(),
  );

  fs.writeFileSync(path.join(root, "src/styles/global.css"), getGlobalStyles());
}

function createI18nSetup(root, languages, baseLocale) {
  // Create project.inlang directory
  const inlangDir = path.join(root, "project.inlang");
  fs.mkdirSync(inlangDir, { recursive: true });

  // Create settings.json
  fs.writeFileSync(
    path.join(inlangDir, "settings.json"),
    JSON.stringify(
      {
        $schema: "https://inlang.com/schema/project-settings",
        baseLocale,
        locales: languages,
        modules: [
          "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
          "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js",
        ],
        "plugin.inlang.messageFormat": {
          pathPattern: "./messages/{locale}.json",
        },
      },
      null,
      2,
    ),
  );

  // Create messages directory
  const messagesDir = path.join(root, "messages");
  fs.mkdirSync(messagesDir, { recursive: true });

  // Create message files for each language
  languages.forEach((lang) => {
    fs.writeFileSync(
      path.join(messagesDir, `${lang}.json`),
      JSON.stringify(
        {
          welcome:
            lang === "en"
              ? "Welcome to your new app!"
              : lang === "vi"
                ? "Chào mừng đến với ứng dụng mới của bạn!"
                : "Welcome to your new app!",
          description:
            lang === "en"
              ? "Start building something amazing"
              : lang === "vi"
                ? "Bắt đầu xây dựng điều gì đó tuyệt vời"
                : "Start building something amazing",
        },
        null,
        2,
      ),
    );
  });
}

function createUISetup(root) {
  // Create components.json for shadcn/ui
  fs.writeFileSync(
    path.join(root, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: false,
        tsx: true,
        tailwind: {
          config: "tailwind.config.mjs",
          css: "src/styles/global.css",
          baseColor: "slate",
          cssVariables: true,
        },
        aliases: {
          components: "@/components",
          utils: "@/utils",
        },
      },
      null,
      2,
    ),
  );

  // Create lib/utils.ts for cn helper
  fs.mkdirSync(path.join(root, "src/lib"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "src/lib/utils.ts"),
    `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  );
}

function createStateSetup(root, stateLibs = ["jotai"]) {
  fs.mkdirSync(path.join(root, "src/store"), { recursive: true });

  if (stateLibs.includes("jotai")) {
    fs.writeFileSync(
      path.join(root, "src/store/jotaiStore.ts"),
      `import { atom } from 'jotai'

export const countAtom = atom(0)
`,
    );
  }

  if (stateLibs.includes("zustand")) {
    fs.writeFileSync(
      path.join(root, "src/store/zustandStore.ts"),
      `import { create } from 'zustand'

type CounterState = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
`,
    );
  }
}

function createAuthSetup(root) {
  fs.mkdirSync(path.join(root, "src/services"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "src/services/auth.ts"),
    `// Google OAuth setup
export const initGoogleAuth = () => {
  // Add your Google OAuth initialization here
  console.log('Google Auth initialized')
}
`,
  );
}

function createTestingSetup(root) {
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

function createQualitySetup(root) {
  fs.writeFileSync(
    path.join(root, "biome.json"),
    JSON.stringify(
      {
        $schema: "https://biomejs.dev/schemas/1.9.4/schema.json",
        vcs: {
          enabled: true,
          clientKind: "git",
          useIgnoreFile: true,
        },
        files: {
          ignoreUnknown: false,
          ignore: [],
        },
        formatter: {
          enabled: true,
          indentStyle: "space",
        },
        organizeImports: {
          enabled: true,
        },
        linter: {
          enabled: true,
          rules: {
            recommended: true,
          },
        },
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    path.join(root, ".editorconfig"),
    `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
`,
  );
}

function createConfigFiles(root, features) {
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

  // tailwind.config.mjs (if UI is selected)
  if (features.includes("ui")) {
    fs.writeFileSync(
      path.join(root, "tailwind.config.mjs"),
      `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
}
`,
    );
  }

  // .env.example
  fs.writeFileSync(
    path.join(root, ".env.example"),
    `VITE_APP_TITLE="My TanStack App"`,
  );

  // wrangler.json (if deploy feature is selected)
  if (features.includes("deploy")) {
    fs.writeFileSync(
      path.join(root, "wrangler.json"),
      JSON.stringify(
        {
          name: projectName, // uses the chosen project name
          pages_build_output_dir: "dist/client",
          compatibility_date: "2024-01-01",
          compatibility_flags: ["nodejs_compat"],
        },
        null,
        2,
      ),
    );
  }
}

function createReadme(root, projectName, features, packageManager) {
  const readme = `# ${projectName}

A modern web application built with TanStack Start.

## Features

${features.map((f) => `- ✅ ${FEATURES[f].name}`).join("\n")}

## Getting Started

1. Install dependencies:
\`\`\`bash
${packageManager} install
\`\`\`

2. Run the development server:
\`\`\`bash
${packageManager} ${packageManager === "npm" ? "run " : ""}dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── routes/        # Route components
│   ├── components/    # Reusable components
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── public/            # Static assets
└── package.json
\`\`\`

## Available Scripts

- \`${packageManager} ${packageManager === "npm" ? "run " : ""}dev\` - Start development server
- \`${packageManager} ${packageManager === "npm" ? "run " : ""}build\` - Build for production
- \`${packageManager} ${packageManager === "npm" ? "run " : ""}start\` - Start production server
${features.includes("testing") ? `- \`${packageManager} ${packageManager === "npm" ? "run " : ""}test\` - Run tests` : ""}
${features.includes("quality") ? `- \`${packageManager} ${packageManager === "npm" ? "run " : ""}lint\` - Lint code` : ""}

## Learn More

- [TanStack Start Documentation](https://tanstack.com/start)
- [React Documentation](https://react.dev)
${features.includes("ui") ? "- [Tailwind CSS](https://tailwindcss.com)\n- [Radix UI](https://radix-ui.com)" : ""}
${features.includes("i18n") ? "- [Inlang](https://inlang.com)" : ""}

## License

MIT
`;

  fs.writeFileSync(path.join(root, "README.md"), readme);
}

// Template code generators
function getClientCode() {
  return `import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)
`;
}

function getSSRCode() {
  return `import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createRouter } from './router'

export default createStartHandler({
  createRouter: () => createRouter(),
})(defaultStreamHandler)
`;
}

function getRouterCode() {
  return `import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const queryClient = new QueryClient()

  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
`;
}

function getRootRouteCode() {
  return `import { Outlet, createRootRoute } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '../styles/global.css'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </QueryClientProvider>
  )
}
`;
}

function getIndexRouteCode() {
  return `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to TanStack Start! 🚀
        </h1>
        <p className="text-xl text-muted-foreground">
          Start building something amazing
        </p>
      </div>
    </div>
  )
}
`;
}

function getGlobalStyles() {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
}

function getViteConfig(features) {
  // Base Vite config with TanStack Start and TypeScript path support
  const baseConfig = `import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
${features.includes('deploy') ? "import cloudflare from '@cloudflare/vite-plugin'" : ''}

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
    ${features.includes('deploy') ? 'cloudflare(),' : ''}
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

function getGitignore() {
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

init().catch((e) => {
  console.error(e);
  process.exit(1);
});
