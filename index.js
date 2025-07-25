#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const appName = process.argv[2];

if (!appName) {
  console.error("Please provide a project name.");
  process.exit(1);
}

console.log(`Creating Devlien app in ${appName}...`);

// Create folder
fs.mkdirSync(appName);
process.chdir(appName);

// Init package.json silently
execSync("npm init -y", { stdio: "ignore" });

// Install main devlien framework
execSync("npm install devlien", { stdio: "inherit" });

// Run devlien setup
execSync("npx devlien setup init", { stdio: "inherit" });
