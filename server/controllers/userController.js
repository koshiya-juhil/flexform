const User = require('../models/User');
const { generateToken } = require('../services/auth');

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

        // res.cookie("token", token.toString(), { httpOnly: true, maxAge: 900000 })
        res.cookie("token", token.toString(), { httpOnly: true })
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
        
        const maxAge = (24 * 60 * 60 * 1000) * 31;
        res.cookie("token", token.toString(), { maxAge: maxAge, httpOnly: true, secure: true })
        res.json({user: temp});
        // res.cookie("token", token.toString()).json({user: temp});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error', notify: true });
    }
}

module.exports = { handleSignUp, handleSignIn };