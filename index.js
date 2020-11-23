/**
 * Primay api file
 */

// Dependencies
const http = require("http");
const https = require("https");
const url = require("url");
const config = require("./config");
const StringDecoder = require("string_decoder").StringDecoder;
const fs = require('fs');
const handlers = require("./lib/handlers")

// Instantiating the HTTP server
const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

// Start HTTPS server
httpServer.listen(config.httpPort, () => {
    console.log("The server is listening on Port " + config.httpPort + " in " + config.envName + " Now");
});

// Instantiating the HTTPS server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
};

// Start HTTPS server
const httpsServer = https.createServer(httpsServerOptions,(req, res) => {
    unifiedServer(req, res);
});


// Start the server and that is should listen on port 3000
httpsServer.listen(config.httpsPort, () => {
    console.log("The server is listening on Port " + config.httpsPort + " in " + config.envName + " Now");
});


const unifiedServer = (req, res) => {
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // Get path from url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // This removes all trailing slashes

    // Get the request Method
    const method = req.method.toLowerCase();

    // Get the queryStringObject as a object
    const queryStringObject = parsedUrl.query;

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

        // Select request handler, if not found use 404
        const chosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notfound;
        
        // construct data object to send to handler
        const data = {
            "trimmedPath": trimmedPath,
            "queryStringObject": queryStringObject,
            "method": method,
            "headers": headers,
            "payload": buffer
        };

        // Route request to handler sp3ecified in router
        chosenHandler(data, (statusCode, payload) => {
            // Use the status code called back by the handler or default to default
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // convert payload to string
            const payloadString = JSON.stringify(payload);

            // return the response
            res.setHeader("Content-Type", "application/json"); // Set the response header content type
            res.writeHead(statusCode);

            // Send the response
            res.end(payloadString);

            // Log what path was requested
            console.log("we are returning this repsponse: \n\r", statusCode, payload, payloadString);
        });
        
    });
}




// Define new request router
const router = {
    'ping': handlers.ping,
    'hello': handlers.hello
};