const validator = require('validator');

const validateStudent = (data) => {
    const errors = {};

    // Required fields validation
    const requiredFields = [
        'first_name', 
        'last_name', 
        'email', 
        'phone_number', 
        'date_of_birth', 
        'gender', 
        'class', 
        'roll_number'
    ];
    
    requiredFields.forEach(field => {
        if (!data[field]) {
            errors[field] = `${field.replace('_', ' ')} is required`;
        }
    });

    // Guardian validation
    if (!data.guardian || !data.guardian.name || !data.guardian.relation) {
        errors.guardian = 'Guardian details (name and relation) are required';
    }

    // Email validation
    if (data.email && !validator.isEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    // Guardian email validation
    if (data.guardian?.email && !validator.isEmail(data.guardian.email)) {
        errors.guardian_email = 'Invalid guardian email format';
    }

    // Phone number validation
    if (data.phone_number && !validator.isMobilePhone(data.phone_number, 'any')) {
        errors.phone_number = 'Invalid phone number format';
    }

    // Guardian phone validation
    if (data.guardian?.phone_number && !validator.isMobilePhone(data.guardian.phone_number, 'any')) {
        errors.guardian_phone = 'Invalid guardian phone number format';
    }

    // Date of birth validation
    if (data.date_of_birth) {
        const dob = new Date(data.date_of_birth);
        if (isNaN(dob.getTime())) {
            errors.date_of_birth = 'Invalid date format';
        } else if (dob > new Date()) {
            errors.date_of_birth = 'Date of birth cannot be in the future';
        }
    }

    // Gender validation
    if (data.gender && !['Male', 'Female', 'Other'].includes(data.gender)) {
        errors.gender = 'Invalid gender value';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateStudent
};