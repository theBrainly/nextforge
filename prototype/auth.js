const jwt = require('jsonwebtoken');

const secret = 'supersecretkey';

function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };

// TODO: Add refresh token logic
// Update 1771332647097

// Update 1771332647331

// Update 1771332647516

// Update 1771332647794

// Update 1771332647887

// Update 1771332648392

// Update 1771332649332

// Update 1771332649381
