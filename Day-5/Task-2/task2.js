const num = parseInt(process.argv[2]);

console.log(isNaN(num) ? "Invalid input" : num % 2 === 0 ? "Even" : "Odd");
