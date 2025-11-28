#!/usr/bin/env node

import { init } from "./src/main.js";

init().catch((e) => {
  console.error(e);
  process.exit(1);
});
