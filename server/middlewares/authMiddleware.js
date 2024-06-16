const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next){
    const token = req.cookies.token;
    req.user = null;
    
    if(!token){
        return next();
    }

    const user = getUser(token);
    req.user = user;

    return next();
}

function restrictTo(roles = []){
    return function(req, res, next){
        if(!req.user) return res.status(401).json({ message: "Login Required"});
        // if(!roles.includes(req.user.role)) res.status(403).json({ message: "Unauthorized"});
        return next();
    }
}

module.exports = { checkForAuthentication, restrictTo };

// function checkForAuthentication(req, res, next){
//     const token = req.headers.authorization;
//     req.user = null;

//     if(!token || !token.split(' ')[1]){
//         return next();
//     }

//     const user = getUser(token);
//     req.user = user;
//     return next();
// }