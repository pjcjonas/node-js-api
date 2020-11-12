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
    
    // Payloads like json come in as a stream.
    // We are going to build up the stream in a buffer as it enters the request.
    let buffer = '';

    // Will only be called if a payload is sent
    req.on('data', (data) => {
        // As data streams in undecoded we use the decoder set to utf-8 to decode the
        // data steam and append it to the buffer.
        buffer += decoder.write(data);
    });

    // The end event will always be called once the request is completed.
    req.on('end', () => {
        buffer += decoder.end();

        // Send the response
        res.end("hello world \n");

        // Log what path was requested
        console.log("request payload: \n\r", buffer);
    });

});

// Start the server and that is should listen on port 3000
server.listen(3000, () => {
    console.log("The server is listening on Port 3000");
});