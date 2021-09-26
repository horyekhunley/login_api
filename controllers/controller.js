const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })
const User = require("../models/model");

exports.getUsers = async(req, res) => {
    const user = await User.find(req.query).sort('name')
    res.send(user)
}
//register controller
exports.register = async (req, res) => {
  try {
    //validate request

    let { email, username, password, passwordCheck } = req.body;

    if (!email || !password || !passwordCheck)
      return res.status(406).json({ err: "You need to fill all details" });
    if (password.length < 8)
      return res
        .status(406)
        .json({ err: "Your password must contain at least 8 characters" });
    if (password !== passwordCheck)
      return res.status(406).json({ err: "Passwords do not match" });

    //hash passwords
    const hash = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      password: hash,
      username,
    });
    newUser.save(newUser).then((register) => {
      res.json({register})
    })
    .catch(error => {
        res.status(406).json({ err: error.message || "Registration error" })
    })

  } catch (error) {
    res.status(500).json({ err: err.message || "Registration error" });
  }
};

//login controller
exports.login = async(req, res) => {
  //get user data
  try {
    //validate login
    if (!req.body) {
      return res.status(406).json({ err: "You need to login to proceed" });
    }

    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(406)
        .json({ err: "You need to enter both email and password to login" });

        const user = await User.findOne({ email })
        if(!user)
            return res.status(406).json({ err: 'This user does not exist' })
    //compare passwords
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) return res.status(406).json({ err: 'Invalid credentials'})

    //create jwt token
    const token = jwt.sign({ id: user._id }, 'process.env.JWT_SECRET')
    res.json({ token, username: user.username, email: user.email });

  } catch (error) {
    res.status(500).json({ err: error.message || "Login error" });
  }
};

//delete user
exports.delete = async(req, res) => {
    const user = await User.findByIdAndDelete(
        req.params.id
    )
    if(!user) return res.status(404).json({ message: 'User not found' })
    res.send(user)
    // try {
    //     await User.findByIdAndDelete(req.user._id)
    //     res.json({ msg: 'User deleted successfully'})
    // } catch (error) {
    //     res.status(500).json({ err: error.message || "Error while deleting user"})
    // }
}