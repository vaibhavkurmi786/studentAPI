const Student = require('./Student');
const Guardian = require('./Guardian');

// Define all relationships here
Student.belongsTo(Guardian, {
    foreignKey: 'guardian_id',  // Only specify the name
    allowNull: false
});

// Guardian.hasMany(Student, {
//     foreignKey: 'guardian_id'  // Use same foreign key name
// });

module.exports = {
    Student,
    Guardian
};