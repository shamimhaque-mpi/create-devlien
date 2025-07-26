#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";

import Terminal from "../utilities/Terminal.js";
import color from "../utilities/Color.js";
import path from "path";



const terminal = new Terminal();

const appName = process.argv[2];
if (!appName) {
  console.error("Please provide a project name.");
  process.exit(1);
}



const config = {
    name: appName,
    version : '1.0.0',
    description: ''
};

console.clear();
terminal.addLine('Project Name : '+ color.text(config.name, 'success'));
terminal.reload();



terminal.readline(`App version (${config.version}) : `)
.then(version=>{
    config.version = version ? version : config.version;
    terminal.addLine('App version : '+ color.text(config.version, 'success'));
    terminal.reload();


    terminal.readline(`App description : `)
    .then(description=>{
        config.description = description ? description : config.description;
        terminal.addLine('App description : ');
        terminal.reload();

        createDevlien(config);
    });
});



function createDevlien (_config){

    terminal.addLine(`Initializing package.json @space PROCESSING`);
    fs.mkdirSync(appName);
    process.chdir(appName);

    execSync("npm init -y", { stdio: "ignore" });
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    pkg.name = _config.name;
    pkg.version = _config.version;
    pkg.description = _config.description;
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    terminal.addLine(`Initializing package.json @space PROCESSING`, 'success');


    terminal.addLine(`Devlien is installing @space INSTALLING`);
    execSync("npm install devlien", { stdio: "inherit" });
    terminal.reload();
    terminal.addLine(`Devlien has been installed @space INSTALLED`, 'success');
    execSync("npx devlien setup --init --installer", { stdio: "inherit" });
}