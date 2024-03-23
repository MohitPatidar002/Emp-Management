const Department = require('../models/department.model.js')
const User = require("../models/user.model.js");

exports.createDepartment = async (req, res) => {
    try{
        
        const {department} = req.body;
        // console.log(department)

        if(!department){
            return res.status(400).json({
                success: false,
                message: "Department Required"
            })
        }

        // check already exist or  not
        const alreadyExist = await Department.findOne({department_Name : department})

        if(alreadyExist){
            return res.json({
                success: false,
                message: "Department Already Exists"
            })
        }
        

        // create enty in db
        
        const newDepartment = await Department.create({department_Name: department})
    
        return res.status(200).json({
            success: true,
            message: "Department Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Department Creation Failed",
        })
    }

}

// delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const {id} = req.body;
        
        if(!id){
            return res.json({
                message: "Id must for deletion"
            })
        }
    
        try {
            const deleteDepartment = await Department.findByIdAndDelete(id);
    
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({
            success: true,
            message: "Delete Successfully"
        })
    } 
    catch (error) {
        return res.json({
            success: false,
            message: "Delete Failed"
        })
    }
}

// get all department
exports.getAllDepartment = async(req, res) => {
    try{
        const getAllDepartment = await Department.find();
        if(!getAllDepartment){
            return res.json({
                success: false,
                message: "Department retriev failed"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Department fetching successfully",
            getAllDepartment
        })
    }
    catch(error){
        return res.json({
            success: false,
            message:"failed to fetch deparment data"
        })
    }
}

exports.assingDepartment = async (req, res) => {
    try{
        const {userId,id} = req.body;
    

        if(!id || !userId){
            throw new Error("department id is required")
        }

        // assign department to the user
        const userDepartment = await User.findByIdAndUpdate(
            userId,
            {
                $set: {department: id}
            },
            {new : true}
        )

        await Department.findByIdAndUpdate(
            id,
            {
                $push: {presentEmployee: userId}
            },
            {new: true}
        )
    }
    catch(error){
        return res.json({
            success: false,
            message: "Failed to assign department to the user"
        })
    }
}