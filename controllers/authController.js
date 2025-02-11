const jwt = require('jsonwebtoken');

const generateToken = async (req, res) => {
    try {
        // For testing purposes, we'll create a simple token
        const token = jwt.sign(
            { id: 1, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Token generation failed',
            error: error.message
        });
    }
};

module.exports = {
    generateToken
};