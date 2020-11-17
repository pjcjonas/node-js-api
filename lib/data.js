/**
 * Library for storing and editing data
 */

 // Dependencies
 const fs = require('fs');
 const path = require('path');

 // Container for the module (to be exported)
const lib = {};

// base directory for data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = (dir, filenanme, data, callback) => {
    // Open the file for writing
    fs.open(lib.baseDir + dir + '/' + filenanme + '.json', 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            let stringData = JSON.stringify(data);

            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, (writeFileErr) => {
                if (!writeFileErr) {
                    fs.close(fileDescriptor, (closeErr) => {
                        if (!closeErr) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing new file');
                }
            });
        } else {
            callback('Could not create the file, it may already exist');
        }
    });
}

// export module
module.exports = lib;