const jwt = require("jsonwebtoken")
require("dotenv").config()

const createToken = (user)=>{
    return jwt.sign({user}, process.env.SECRET_KEY)
}

const verifyToken = (req, res, next)=>{
    if(req.headers.cookie == undefined){
        console.log("token is missing")
        res.send("token is missing")
    }else{
        const token = req.headers.cookie.split("=")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, data)=>{
            if(err){
                res.status(401).send({
                    "error": {
                      "status": 401,
                      "code": "AUT_02",
                      "message": "Access Unauthorized",
                      "field": "NoAuth"
                    }
                  })
            }
            req.data = data
        })
        next();
    }
}

module.exports = {createToken, verifyToken};
