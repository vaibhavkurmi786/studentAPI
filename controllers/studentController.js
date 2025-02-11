const Student = require('../models/Student');
const Guardian = require('../models/Guardian');
const { validateStudent } = require('../utils/validators');
const { sequelize, connectDB } = require('../config/database');

const createStudent = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        // Validate request body
        const { isValid, errors } = validateStudent(req.body);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors
            });
        }

        // Check for existing student
        const existingStudent = await Student.findOne({
            where: { email: req.body.email }
        });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: 'A student with this email already exists'
            });
        }

        // Check for duplicate roll number in class
        const duplicateRoll = await Student.findOne({
            where: {
                class: req.body.class,
                roll_number: req.body.roll_number
            }
        });

        if (duplicateRoll) {
            return res.status(409).json({
                success: false,
                message: 'Roll number already exists in this class'
            });
        }

        // Handle guardian
        let guardian;
        const existingGuardian = await Guardian.findOne({
            where: { email: req.body.guardian.email }
        });

        if (existingGuardian) {
            guardian = existingGuardian;
        } else {
            guardian = await Guardian.create(req.body.guardian, { transaction });
        }

        // Create student
        const student = await Student.create({
            ...req.body,
            guardian_id: guardian.id
        }, { transaction });

        await transaction.commit();

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            student_id: student.id
        });

    } catch (error) {
        await transaction.rollback();

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.reduce((acc, err) => {
                    acc[err.path] = err.message;
                    return acc;
                }, {})
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createStudent
};