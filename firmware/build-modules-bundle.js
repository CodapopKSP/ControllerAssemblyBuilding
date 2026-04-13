#!/usr/bin/env node
/**
 * Reads every .ino file in Modules/ and writes modulesBundle.js for the web UI.
 * Run from repo root: node firmware/build-modules-bundle.js
 * Or from firmware/: node build-modules-bundle.js
 */
const fs = require("fs");
const path = require("path");

const firmwareDir = __dirname;
const modulesDir = path.join(firmwareDir, "Modules");
const outFile = path.join(firmwareDir, "modulesBundle.js");

const names = fs
  .readdirSync(modulesDir)
  .filter((f) => f.endsWith(".ino"))
  .sort();

if (names.length === 0) {
  console.error(`No .ino files found in ${modulesDir}`);
  process.exit(1);
}

const bundle = {};
for (const name of names) {
  bundle[name] = fs.readFileSync(path.join(modulesDir, name), "utf8");
}

const line = `window.firmwareModuleFiles = ${JSON.stringify(bundle)};\n`;
fs.writeFileSync(outFile, line, "utf8");
console.log(`Wrote ${outFile} (${names.length} modules)`);
