const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const omit = require("lodash/omit");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            maxlength: 255,
        },
        email: {
            type: String,
            required: true,
            maxlength: 255,
            unique: true,
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 10,
        },
        password: {
            type: String,
            required: false,
            minlength: 5,
            maxlength: 255,
            select: false,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        resetPasswordExpires: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

userSchema.methods.generateToken = function () {
    return jwt.sign(
        omit(this.toJSON(), ["password", "__v"]),
        process.env.JWT_SECRET
    );
};

const User = mongoose.model("User", userSchema);

exports.User = User;
