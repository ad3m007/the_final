const isAdmin = (req, res, next) => {
    if(!req.user) {
        console.log("1",req.user);
        return res.status(401).send({msg: "Not authenticated"})
        
    }
    if(req.user.role !== "admin") {
        console.log("2",req.user);
        return res.status(403).send({msg: "Forbidden: admin only"})
        
    }
    next()
}

module.exports = isAdmin


