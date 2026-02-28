// Render fallback entry point
// This file exists because Render defaults to running 'node index.js' 
// if the Start Command is not explicitly configured in the Render Dashboard.
require('./dist/apps/core-api/main.js');
