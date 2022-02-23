const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const register = async(req, res) => {
    // await User.deleteMany({});
    const user = await User.create(req.body);
    const token = user.createToken(user);
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email||!password){
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new BadRequestError("The user is not existed");
    }

    const hashedPassword = await user.comparePassword(password);
    console.log(hashedPassword);
    if(!hashedPassword){
        throw new UnauthenticatedError("Wrong password");
    }
    const token = await user.createToken(user);

    res.status(StatusCodes.CREATED).json({user, token: token});

}

module.exports = {
    register,
    login
}