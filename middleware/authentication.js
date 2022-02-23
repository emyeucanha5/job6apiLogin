const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors')


const auth = (req,res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(!authHeader || !token)
        {
            throw new UnauthenticatedError('Authenticated Error');
        }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        req.user = { userId: payload.userID, name: payload.userName };
        next();
    } catch (error) {
        // console.log("error");
        throw new UnauthenticatedError('Authenticated Error');
    }
}

module.exports = auth;