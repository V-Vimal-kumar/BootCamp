const fs = require("fs").promises;
const path = require("path");

const inputFile = path.join(__dirname, "input.txt");
const outputFile = path.join(__dirname, "output.txt");

// Step 1: Read file
fs.readFile(inputFile, "utf8")
    .then((data) => {
        console.log("File read successfully:", data);
        
        // Step 2: Process content (convert to uppercase)
        const processedData = data.toUpperCase();
        return fs.writeFile(outputFile, processedData);
    })
    .then(() => {
        console.log("Processed content written to output.txt");
    })
    .catch((err) => {
        console.error("Error:", err);
    });
