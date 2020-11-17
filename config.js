// Create and export config variabls

// General container for all the environments
const environments = {};

// Staging object (default environment)
environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
};

// Production object
environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
};

// Determine which env to export
const currentEnvironmet = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''; 

// Check if passed env is configured
const environmentToExport = typeof(environments[currentEnvironmet]) == 'object' ? environments[currentEnvironmet] : environments.staging;

// Export the configured env
module.exports = environmentToExport;