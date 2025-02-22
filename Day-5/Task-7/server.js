const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    
    if (req.url === "/") {
        res.end("<h1>Welcome to the Home Page</h1>");
    } else if (req.url === "/about") {
        res.end("<h1>About Us</h1><p>This is the about page.</p>");
    } else if (req.url === "/contact") {
        res.end("<h1>Contact Us</h1><p>Email: contact@example.com</p>");
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
