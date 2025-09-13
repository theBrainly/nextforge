const fs = require('fs');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('app.log', `[${timestamp}] ${message}\n`);
    console.log(`[${timestamp}] ${message}`);
}

module.exports = { log };

// Fixed timestamp formatting