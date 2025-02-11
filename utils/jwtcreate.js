const crypto = require('crypto');

const generateSecret = {
    // Method 1: Using random bytes (recommended)
    randomBytes: (length = 64) => {
        return crypto.randomBytes(length).toString('hex');
    }
}

console.log(generateSecret.randomBytes());