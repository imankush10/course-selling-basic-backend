require("dotenv").config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.USER_JWT_SECRET || "imankush10";

function userAuth(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, jwtSecret, (err,decoded)=>{
            if(err) return res.status(400).json({
                message:"Invalid Authorization"
            })
            else next();
        })
    } catch(error){
        res.status(400).json({
            message:"Invalid Authorization"
        })
    }
};

module.exports = userAuth;