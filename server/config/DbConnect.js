const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB)
        .then(() => {
            console.log("DB Connection Successful")
        })
    }
    catch(error){
        console.log("DB Connection failed")
    }
}

module.exports = DbConnect;