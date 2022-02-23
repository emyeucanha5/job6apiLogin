const moongose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: true,
    }
});


UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.createToken = function(user) {
    const token = jwt.sign({userID: user._id, userName: user.name, userEmail: user.email}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
}
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);;
}

module.exports = moongose.model("User", UserSchema);