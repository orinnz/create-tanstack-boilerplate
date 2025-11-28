import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createUISetup(root) {
  const templateDir = path.resolve(__dirname, "../../templates/ui");
  
  // Copy all files from templates/ui to root
  fs.cpSync(templateDir, root, { recursive: true });
}
