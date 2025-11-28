import fs from "node:fs";
import path from "node:path";

export function createI18nSetup(root, languages, baseLocale) {
  // Create project.inlang directory
  const inlangDir = path.join(root, "project.inlang");
  fs.mkdirSync(inlangDir, { recursive: true });

  // Create src/paraglide directory
  fs.mkdirSync(path.join(root, "src/paraglide"), { recursive: true });

  // Create settings.json
  fs.writeFileSync(
    path.join(inlangDir, "settings.json"),
    JSON.stringify(
      {
        $schema: "https://inlang.com/schema/project-settings",
        baseLocale,
        locales: languages,
        modules: [
          "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@2/dist/index.js",
          "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js",
        ],
        "plugin.inlang.messageFormat": {
          pathPattern: "../messages/{locale}.json",
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
