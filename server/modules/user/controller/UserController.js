const bcrypt = require("bcrypt");
const omit = require("lodash/omit");
const jwt = require("jsonwebtoken");

const { User } = require("../model/User");
const { sendEmail, verificationToken } = require("../../../utils.js");

const validator = require("../validator/UserValidator");

exports.registerUser = async (req, res) => {
    const { error, value: userReq } = validator.validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = userReq;

    let user = await User.findOne({ email });
    if (user) return res.status(400).send("Email already registered");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
        ...userReq,
        password: hashedPassword,
    });
    await user.save();

    let message;
    message = await emailVerificationLink(user);

    let response;
    if (message) {
        response = {
            user: omit(user.toJSON(), ["__v", "password"]),
            message,
        };
    } else {
        response = {
            user: omit(user.toJSON(), ["__v", "password"]),
        };
    }
    res.status(200).send(response);
};

exports.readAll = async (req, res) => {
    const user = await User.find();
    res.send(user);
};

exports.activeAccount = (req, res) => {
    const token = req.params.token;
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async function (err, decodedToken) {
                if (err) {
                    return res.status(400).send("incorrect or expire link");
                } else {
                    const { email } = decodedToken;
                    let user = await User.findOne({ email });
                    if (!user) {
                        return res.status(401).send({
                            msg: "We were unable to find a user for this verification. Please SignUp!",
                        });
                    } else if (user.isVerified) {
                        return res
                            .status(200)
                            .send(
                                "User has been already verified. Please Login"
                            );
                    } else {
                        user.isVerified = true;
                        user.save(function (err) {
                            if (err) {
                                return res
                                    .status(500)
                                    .send({ msg: err.message });
                            } else {
                                const link = `${process.env.CLIENT_URL}`;

                                const message = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    body{
                        position: relative;
                    }
                    .wrapper{
                        width: 40%;
                        height: 400px;
                       margin: 5% auto;
                    }
                </style>
                </head>
                <body>
                    <div class="wrapper">
                    <h5 style="font-size: 1.5rem;font-family: Nunito;font-weight: 600; text-align: center;">Congratulation</h5>
                    <h4 style="font-size: 1.5rem;font-family: Nunito;font-weight: 400;text-align: center;">Your Account has been verified. Please continue</h4>
                    <div style="margin: auto auto;text-align: center;">
                    <a href="${link}"  style="text-decoration: none;outline: none;padding: 12px 30px;border: 1px solid;color:white;background-color: rgb(22, 216, 22);font-size: 1.2rem;font-family: Nunito;font-weight: 700;margin: auto auto;border-radius: 10px;">Continue</a>
                </div>
                </div>
                </body>
                </html>`;
                                res.status(200).send(message);
                            }
                        });
                    }
                }
            }
        );
    } else {
        return res.send("some thing went wrong");
    }
};

const emailVerificationLink = async (user) => {
    const token = verificationToken(user.email);
    const from = process.env.SENDGRID_EMAIL;
    const subject = "Account Verification Link";
    if (process.env.NODE_ENV === "development") {
        text = `Hello ${user.fullName},
        Please verify your account by clicking the link: ${process.env.VERIFICATION_LINK}/api/user/confirmation/${token}
        Thank You!`;

        html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">

                </head>
                <body>
                    <h5 style="font-size: 1.5rem;font-family: Nunito;font-weight: 500;">Hello ${user.fullName}</h5>
                    <h4 style="font-size: 1.5rem;font-family: Nunito;font-weight: 400;">Please verify your account by clicking on button below.</h4>
                    <a href="${process.env.VERIFICATION_LINK}/api/user/confirmation/${token}" style="text-decoration: none;outline: none;padding: 15px 25px;border: 1px solid white;color:white;background-color: orange;font-size: 1.2rem;font-family: Nunito;font-weight: 700">Verify Account</a>
                    <h5 style="font-size: 1.5rem;font-family: Nunito;font-weight: 500;">Thankyou!</h5>
                </body>
            </html>`;
    } else {
        text = `Hello ${user.fullName}
     
      Please verify your account by clicking the link: "${process.env.VERIFICATION_LINK}/api/user/confirmation/${token}" 
     
     Thank You!`;
    }

    const message = {
        to: user.email,
        from: from,
        subject: subject,
        text: text,
        html: html,
    };

    const verificationEmail = await sendEmail(message);
    if (verificationEmail) {
        return `A verification email has been sent to 
      ${user.email}. It will be expire after one hour. If you not get verification Email click on resend token.`;
    } else {
        return "Technical Issue!, Please click on resend for verify your Email.";
    }
};
