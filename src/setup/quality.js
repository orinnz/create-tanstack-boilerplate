import fs from "node:fs";
import path from "node:path";

export function createQualitySetup(root) {
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
