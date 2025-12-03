const fs = require('fs');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('app.log', `[${timestamp}] ${message}\n`);
    console.log(`[${timestamp}] ${message}`);
}

module.exports = { log };

// Fixed timestamp formatting
// Update 1771332646873

// Update 1771332646923

// Update 1771332647700

// Update 1771332647979

// Update 1771332648209

// Update 1771332648529

// Update 1771332648996

// Update 1771332649565

// Update 1771332649613

// Update 1771332649806

// Update 1771332650039

// Update 1771332650700

// Update 1771332651032

// Update 1771332651092
