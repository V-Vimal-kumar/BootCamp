const process = require('process');

if (process.argv.length !== 3) {
    console.log("Usage: node script.js <string>");
    process.exit(1);
}

const inputString = process.argv[2];
const reversedString = inputString.split('').reverse().join('');
console.log(reversedString);
