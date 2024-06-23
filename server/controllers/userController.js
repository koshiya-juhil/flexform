const User = require('../models/User');
const { generateToken } = require('../services/auth');

async function setToken(res, token, user){
    try {
        const maxAge = (24 * 60 * 60 * 1000) * 31;
        // res.cookie("token", token.toString(), { httpOnly: true, maxAge: 900000 })
        res.cookie("token", token.toString(), { 
            maxAge: maxAge, 
            // secure: true, 
            // sameSite: 'None',
            // httpOnly: true,
        })
        res.status(200).json({user: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify: true });
    }
}

async function handleSignUp(req, res){
    try {
        const data = req.body;
        const newUser = new User(data);
        let response = await newUser.save();
        
        const payload = {
            id: response.id,
            email: response.email,
        }

        const token = generateToken(payload);
        console.log("Token is : ", token);

        let user = JSON.parse(JSON.stringify(response));
        delete user.password;

        // setToken(res, token, user);

        const maxAge = (24 * 60 * 60 * 1000) * 31;
        res.cookie("token", token.toString(), { 
            maxAge: maxAge, 
            sameSite: 'None',
        })
        // secure: true, 
        // httpOnly: true,
        res.status(200).json({user: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error", notify: true });
    }
}

async function handleSignIn(req, res){
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ error: "Invalid username or password", notify: true });
        }

        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payload);

        let temp = JSON.parse(JSON.stringify(user));
        delete temp.password;

        // setToken(res, token, temp);
        
        const maxAge = (24 * 60 * 60 * 1000) * 31;
        res.cookie("token", token.toString(), { 
            maxAge: maxAge, 
            secure: true, 
            sameSite: 'None',
            // httpOnly: true, 
        });

        res.status(200).json({user: temp});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error', notify: true });
    }
}

// this function is used for clear cookie that are stored as http-Only
async function handleClearCookie(req, res){
    try {
        const { cookieKey } = req.body;
        res.cookie(cookieKey, '', {
            // path: '/',
            // httpOnly: true,
            expires: new Date(0),
        })
        res.status(200).json({ message: "HTTP-only cookie cleared" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error', notify: true });
    }
}

module.exports = { handleSignUp, handleSignIn, handleClearCookie };