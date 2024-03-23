const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
    {
        department_Name: {
            type: String,
            required: true,
        },
        presentEmployee : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {timestamps: true}
)

module.exports = mongoose.model( 'Department', departmentSchema )