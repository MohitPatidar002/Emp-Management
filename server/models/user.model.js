const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,
            trim: true
        },
        contact: {
            type: Number,
            required:true,
            trim: true
        },
        email: {
            type: String,
            required:true,
            trim: true
        },
        password: {
            type: String,
            required:true,
        },
        city: {
            type: String,
            required:true,
            trim: true
        },
        role: {
            type: String,
            required:true,
            enum : ['employee','manager']
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        },
        token: {
            type: String,
        }
    }, 
    {timestamps: true})

module.exports = mongoose.model( 'User', userSchema )