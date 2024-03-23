const jwt = require('jsonwebtoken')
require('dotenv').config();


exports.auth = async (req, res, next) => {
    try {
        
        const token = req.header("Authorization").replace("Bearer ", "");
        
        if(!token){
            return res.json({
                success: false,
                message: "token is absent"
            })
        }
    
        try {
            const decode = await jwt.verify(token , process.env.JWT_TOKEN)
            
        
            req.user = decode;

            next();
        } 
        catch (error) {
            return res.json({
                message: "token verification failed"
            })
        }
    } 
    catch (error) {
        return res.json({
            message : "Error in auth middleware "
        })
    }
}