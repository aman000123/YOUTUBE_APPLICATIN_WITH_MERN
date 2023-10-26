
const bcrypt = require('bcrypt')
const User = require('../modals/user')

const jwt = require('jsonwebtoken')

const { createError } = require('../error')

//mongoose se req to async hoga  bcz take time

const signup = async (req, res, next) => {
    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // If a user with the same email exists, respond with an error message

            return res.status(400).json({ message: 'Hi user this email id is already exists.' });
        }

        // If no existing user, proceed with user creation
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        console.log("user save in db is", newUser);

        // Save the new user in MongoDB
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        //  res.status(500).json({ message: 'An error occurred while signup in', error: err });
        const users = await User.find();
        res.status(500).send(users);

    }
}



const signin = async (req, res, next) => {

    try {
        //User == is collection
        const user = await User.findOne({ name: req.body.name })
        console.log("user in db", user)
        if (!user) return res.status(500).json({ message: ' ! Sorry User not found' });



        //chcek password
        const isCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return res.status(500).json({ message: 'Wrong password' });
        // next(createError(400, "Wrong password!"))



        //generate token
        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY)
        console.log("token is", token)

        //we ca not send password
        // const { password, ...other } = user

        //kai other things bhi send ho rahi
        const { password, ...other } = user._doc

        //res.cookies(keyname,token,credentials)
       

        res.cookie("access_token", token, {
              domain:"unique-croquembouche-40b463.netlify.app",
              path: "/", 
              httpOnly: true,
              secure: true,
           //  sameSite: 'None'
          
        });



        // Send user data (excluding the password) in the response
        const { password: _, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (err) {
        // next(err)
        res.status(500).json({ message: 'An error occurred while signing in', error: err });


    }

}




const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
            res.cookie("access_token", token, {
                    httpOnly: true,
                        domain: "https://amanytbes.onrender.com",
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.SECRETKEY);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};























module.exports = {
    signup,
    signin,
    googleAuth
}
