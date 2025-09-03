const jwt = require("jsonwebtoken")
const User = require("../Models/userSchema")

const isAuth = async (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["authorisation"]
    if(!authHeader) {
        console.log("1",authHeader);
        res.status(401).send({msg: "No token provided"})
    } else {
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader
        const decoded = jwt.verify(token, process.env.privateKey)
        const user = await User.findOne({_id: decoded.id})
        console.log("2",user);
        if(!user) {
            res.status(401).send({msg: "User not connected"})
        } else {
            req.user = user
            next()
            console.log("3",user);
        }
    }
}

module.exports = isAuth