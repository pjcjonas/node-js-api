/**
 * Primay api file
 */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all requests
const server = http.createServer((req, res) => {
    
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    // Get path from url
    const urlPath = parsedUrl.pathname;
    // Send the response
    
    // Log what path was requested
});

// Start the server and that is should listen on port 3000
server.listen(3000, () => {
    console.log("The server is listening on Port 3000");
});