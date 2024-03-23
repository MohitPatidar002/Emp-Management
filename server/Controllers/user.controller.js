const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const { useRevalidator } = require("react-router-dom");
require('dotenv').config();

// signup controller
exports.signup = async(req, res) => {
    try {
        const {name, contact, email, password, city, role} = req.body;
    
        if(!name || !contact || !email || !password || !city || !role){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }
        
        const registerUser = await User.findOne({email})
        // console.log(registerUser)
    
        if(registerUser){
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            })
        }
    
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword)
        // create entry in db
        
        
                const user = await User.create(
                    {
                        name, 
                        contact,
                        email,
                        password : hashedPassword,
                        city,
                        role,
                        department: null,
                    } 
                )
       
        return res.status(200).json({
            success : true,
            message : "Sign Up Successfully",
            data: user
        })
    } 
    catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "signup failed"
            }
        )
    }


}

// login controller
exports.login = async (req, res) => {

    try {
        const {email, password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }
    
        const user = await User.findOne({email})
    
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Email is Incorrect"
            })
        }
    
        // compare the user password
        if(await bcrypt.compare(password,user.password)){
    
            const payload = {
                id : user._id,
                email : user.email,
                role : user.role,
            }
    
            const token = jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn: "24h"});
            // console.log("token", token)
            user.token = token;
            user.password = undefined;
    
            return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                user
            })
        }
        else{
            return res.status(500).json({
                success: false,
                message: "Incorrect Password"
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failed"
        })
    }
}

// single user detail
exports.userDetail = async(req, res) => {
    try{
        const userId = req.user.id;
        const userDetail = await User.findById(userId);
        
        return res.status(200).json({
            success: true,
            message: "User Details retrieved Successfully!",
            userDetail
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not get the users detail",
            userDetails
        })
    }
}


// get all user details
exports.getAllUser = async (req, res) => {
    try{
        const getAllUserData = await User.find().populate('department')

        if(!getAllUserData){
            return res.json({
                success: false,
                message: "Failed to find all the users"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successful retrieve all the users",
            getAllUserData
        })
    }
    catch(error){
        return res.json({
            success: false,
            message: "Failed to get all users detail"
        })
    }
}