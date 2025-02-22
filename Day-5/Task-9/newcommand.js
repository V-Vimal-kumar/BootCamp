#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const command = process.argv[2]; // First argument: command (create, read, delete)
const fileName = process.argv[3]; // Second argument: file name

if (!command || !fileName) {
    console.error("Usage: my-tool <command> <filename>");
    console.error("Commands: create, read, delete");
    process.exit(1);
}

const filePath = path.join(__dirname, fileName);

switch (command) {
    case "create":
        fs.writeFile(filePath, "Hello, this is a new file!", (err) => {
            if (err) {
                console.error("Error creating file:", err);
            } else {
                console.log(`File '${fileName}' created successfully!`);
            }
        });
        break;

    case "read":
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
            } else {
                console.log(`Content of '${fileName}':\n${data}`);
            }
        });
        break;

    case "delete":
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log(`File '${fileName}' deleted successfully!`);
            }
        });
        break;

    default:
        console.error("Invalid command. Use: create, read, delete.");
}
