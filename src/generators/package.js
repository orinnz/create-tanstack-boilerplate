import { FEATURES } from "../constants.js";

export function generatePackageJson(name, features, packageManager, stateLibs = ["jotai"], validatorLib) {
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
      "@tanstack/react-query": "^5.85.5",
      "@tanstack/react-router": "^1.132.7",
      "@tanstack/react-router-with-query": "^1.132.7",
      react: "^19.2.0",
      "react-dom": "^19.2.0",
      vite: "^7.1.3",
    },
    devDependencies: {
      "@tanstack/react-start": "^1.132.9",
      "@tanstack/router-core": "^1.132.7",
      "@tanstack/start-client-core": "^1.132.9",
      "@types/node": "^24.3.0",
      "@types/react": "^19.2.2",
      "@types/react-dom": "^19.2.2",
      "vite-tsconfig-paths": "^5.1.4",
      "@vitejs/plugin-react": "^5.0.4",
      typescript: "^5.9.2",
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

  if (features.includes("validator")) {
    if (validatorLib === "zod") {
      pkg.dependencies["zod"] = "latest";
      pkg.dependencies["@tanstack/zod-form-adapter"] = "latest";
    }
    if (validatorLib === "arktype") {
      pkg.dependencies["arktype"] = "latest";
      pkg.dependencies["@tanstack/arktype-form-adapter"] = "latest";
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
        "@tanstack/react-start-server": "^1.132.9",
        "@tanstack/start-server-core": "^1.132.9",
        "@tanstack/start-plugin-core": "^1.132.9",
        "@tanstack/react-start-plugin": "^1.132.9",
        "@tanstack/router-plugin": "^1.132.7",
        "@tanstack/router-generator": "^1.132.7",
        "@tanstack/server-functions-plugin": "^1.132.9",
      },
    };
  }

  return pkg;
}
