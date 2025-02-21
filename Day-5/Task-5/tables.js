const num = parseInt(process.argv[2]);

if (isNaN(num)) {
    console.log("Usage: node script.js <number>");
} else {
    for (let i = 1; i <= 10; i++) {
        console.log(`${num} x ${i} = ${num * i}`);
    }
}
