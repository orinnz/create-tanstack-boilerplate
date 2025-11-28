import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createBaseStructure(root, features) {
  const templateDir = path.resolve(__dirname, "../../templates/base");

  // Helper to copy directory recursively
  const copyDir = (src, dest) => {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        // Special handling for files that need processing
        if (entry.name === "server.ts" || entry.name === "router.tsx" || entry.name === "__root.tsx") {
          fs.writeFileSync(destPath, processTemplate(srcPath));
        } else if (entry.name === "routeTree.gen.ts") {
           // Skip placeholder
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
  };

  // Helper to read and process template
  const processTemplate = (filePath) => {
    let content = fs.readFileSync(filePath, "utf-8");

    if (features.includes("i18n")) {
      // server.ts
      content = content.replace(
        "// {{I18N_IMPORTS}}",
        `import { paraglideMiddleware } from './paraglide/server'`
      );
      content = content.replace(
        "// {{I18N_FETCH}}",
        `return paraglideMiddleware(request, ({ request: req }) => handler.fetch(req))`
      );
      // router.tsx
      content = content.replace(
        "// {{I18N_IMPORTS}}",
        `import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'`
      );
      content = content.replace(
        "// {{I18N_REWRITE}}",
        `rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },`
      );
      // __root.tsx
      content = content.replace(
        "// {{I18N_IMPORTS}}",
        `import { getLocale } from '../paraglide/runtime'`
      );
      content = content.replace(
        "// {{I18N_LOCALE_HOOK}}",
        `const currentLocale = getLocale()`
      );
      content = content.replace(
        "// {{I18N_LOCALE_PROP}}",
        `locale={currentLocale}`
      );
    } else {
      // Remove placeholders if feature not enabled
      content = content.replace("// {{I18N_IMPORTS}}", "");
      content = content.replace("// {{I18N_FETCH}}", "");
      content = content.replace("// {{I18N_REWRITE}}", "");
      content = content.replace("// {{I18N_LOCALE_HOOK}}", "");
      content = content.replace("// {{I18N_LOCALE_PROP}}", "");
    }

    return content;
  };

  // Copy everything from templates/base to root
  copyDir(templateDir, root);
}
