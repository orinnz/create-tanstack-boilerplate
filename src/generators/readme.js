import fs from "node:fs";
import path from "node:path";
import { FEATURES } from "../constants.js";

export function createReadme(root, projectName, features, packageManager) {
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
${features.includes("form") ? "- [TanStack Form](https://tanstack.com/form)" : ""}
${features.includes("i18n") ? "- [Inlang](https://inlang.com)" : ""}

## License

MIT
`;

  fs.writeFileSync(path.join(root, "README.md"), readme);
}
