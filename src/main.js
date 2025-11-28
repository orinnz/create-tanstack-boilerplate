import fs from "node:fs";
import path from "node:path";
import { bold, cyan, green, red, yellow } from "kolorist";
import prompts from "prompts";
import { FEATURES } from "./constants.js";
import { generatePackageJson } from "./generators/package.js";
import { createReadme } from "./generators/readme.js";
import { createConfigFiles } from "./generators/config.js";
import { createBaseStructure } from "./setup/base.js";
import { createI18nSetup } from "./setup/i18n.js";
import { createUISetup } from "./setup/ui.js";
import { createStateSetup } from "./setup/state.js";
import { createTestingSetup } from "./setup/testing.js";
import { createQualitySetup } from "./setup/quality.js";
import { getGitignore } from "./generators/config.js";

export async function init() {
  // Banner
  console.log(cyan(bold("\n🚀 Create TanStack Start Boilerplate\n")));

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
            values.features.includes("validator") ? "select" : null,
          name: "validatorLib",
          message: "Select validation library:",
          choices: [
            { title: "Zod", value: "zod", selected: true },
            { title: "ArkType", value: "arktype" },
          ],
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
    validatorLib,
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
    validatorLib,
  );
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2),
  );

  // Create base structure
  createBaseStructure(root, features);

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

  if (features.includes("testing")) {
    createTestingSetup(root);
  }

  if (features.includes("quality")) {
    createQualitySetup(root);
  }

  // Create config files
  createConfigFiles(root, features, projectName);

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
