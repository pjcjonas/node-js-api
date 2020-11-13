// Create and export config variabls

// General container for all the environments
const environments = {};

// Staging object (default environment)
environments.staging = {
    port: 3000,
    envName: 'staging'
};

// Production object
environments.production = {
    port: 5000,
    envName: 'production'
};

// Determine which env to export
const currentEnvironmet = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''; 

// Check if passed env is configured
const environmentToExport = typeof(environments[currentEnvironmet]) == 'object' ? environments[currentEnvironmet] : environments.staging;

// Export the configured env
module.exports = environmentToExport;