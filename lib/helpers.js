// Dependencies
const crypto = require('crypto');
const config = require('../config');

// Helpeprs Containers
const helpers = {};

// Using Sha256
helpers.hash = (str) => {
    if (typeof(str) == 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hasingSecret).update(str).digest('hex');
        return hash;
    }

    return false;
}

// Export the containers
module.exports = helpers;