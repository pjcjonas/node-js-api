/**
 * Primay api file
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

// The server should respond to all requests
const server = http.createServer((req, res) => {
    
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // Get path from url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // This removes all trailing slashes

    // Get the request Method
    const method = req.method.toLowerCase();

    // Get the querystring as a object
    const queryString = parsedUrl.query;

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload - utf-8 is standard for json strings
    const decoder = new StringDecoder("utf-8");

    // Send the response
    res.end("hello world \n");

    // Log what path was requested
    console.log("request headers: \n\r", headers);

    
});

// Start the server and that is should listen on port 3000
server.listen(3000, () => {
    console.log("The server is listening on Port 3000");
});