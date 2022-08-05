const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, from, subject, text, html) => {
    const message = {
        to,
        from,
        subject,
        text,
        html,
    };

    return sgMail.send(message, function (err, result) {
        if (err) {
            console.log("Email Not Sent");
            return false;
        } else {
            console.log("Email was Sent");
            return true;
        }
    });
};

const verificationToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
};

const generateToken = (length) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

exports.sendEmail = sendEmail;
exports.verificationToken = verificationToken;
exports.generateToken = generateToken;
