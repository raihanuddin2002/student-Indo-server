const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userSchema = Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 255,
        unique: true


    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

userSchema.methods.generateJwt = function () {
    const token = jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET_KEY);
    return token;
}

const User = model("Users", userSchema);



module.exports.User = User;