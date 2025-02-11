const express = require('express');
const router = express.Router();
const { createStudent } = require('../controllers/studentController');
const auth = require('../middleware/auth');

// Middleware to parse JSON bodies
router.use(express.json());

// Create student route with authentication
router.post('/create', auth, createStudent);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;