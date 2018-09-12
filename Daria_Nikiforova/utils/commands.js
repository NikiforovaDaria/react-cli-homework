const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function createDirectory(dirName, componentName) {
    if (!fs.existsSync(path.resolve(dirName))) {
        fs.mkdirSync(path.resolve(dirName));
    }
    if (!fs.existsSync(path.resolve(dirName, componentName))) {
        fs.mkdirSync(path.resolve(dirName, componentName));
    }
}

function createFiles(extensions, subDir, componentName) {
    let command;
    switch (process.platform) {
        case 'linux':
            command = 'touch ';
            break;
        case 'darwin':
            command = 'touch ';
            break;    
        case 'win32':
            command = 'echo > ';
            break;
        default:
            throw new Error('Unsupported platform: ' + process.platform);
    }
    extensions.forEach((ext) => {
        exec(command + path.resolve(subDir, componentName + ext), (err) => {
            if (err) {
                throw err
            }
        });
    });
        exec(command + path.resolve(subDir, "index.js"), (err) => {
            if (err) {
                throw err
            }
        });
    };
    
    function createTemplates(subDir, componentName, type) {
        if (type === "component") {
            const componentTemplate = 
            `import React from 'react';
import './${componentName}.css';\n
export default function ${componentName}(props) {
       return ( 
            <div>
            ${componentName} works!
            </div>
        )
}`;
            fs.writeFileSync(path.resolve(subDir, componentName + ".js"), componentTemplate );
            const templateIndex = `export default from './${componentName}.js';`;
            fs.writeFileSync(path.resolve(subDir, "index.js"), templateIndex);
        }
}
module.exports = {createDirectory, createFiles, createTemplates};