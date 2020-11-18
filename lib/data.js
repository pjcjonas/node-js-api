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

// Read data from a file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", (err, data) => {
        callback(err, data);
    })
}

// Update existing file
lib.update = (dir, file, data, callback) => {
    // Open the file
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            let stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if (!err) {
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (writeFileErr) => {
                        if (!writeFileErr) {
                            fs.close(fileDescriptor, (err) => {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            })
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback('error truncating file'); 
                }
            });
        } else {
            callback('unable to write to file for writing, it may not exist yet');
        }
    });
};

// Delete a file
lib.delete = (dir, file, callback) => {

    // Unlink the file
    fs.unlink(lib.baseDir + dir + "/" + file + ".json", (err) => {
        if (!err) {
            callback(false);
        } else {
            callback("Unable to delete file");
        }
    })

};

// export module
module.exports = lib;