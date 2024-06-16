const jwt = require('jsonwebtoken')

// const jwtAuthentication = (req, res, next) => {
//     const authorization = req.headers.authorization
//     if(!authorization) return res.status(401).json({ error: "Token not found" });

//     const token = request.headers.authorization.split(' ')[1];
//     if(!token) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ error: 'Invalid token' });
//     }
// }

const generateToken = (userData) => {
    // return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
    return jwt.sign(userData, process.env.JWT_SECRET);
}

const getUser = (token) => {
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, getUser };