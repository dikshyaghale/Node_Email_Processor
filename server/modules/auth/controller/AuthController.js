const bcrypt = require("bcrypt");

const { User } = require("../../user/model/User");
const validator = require("../../user/validator/UserValidator");

exports.auth = async (req, res) => {
    const { error, value: authReq } = validator.validateAuthUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = authReq;

    let user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).send("Invalid email or password");

    if (user.isVerified === true) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateToken();
        user = {
            accessToken: token,
        };

        res.send(user);
    } else return res.status(400).send("Please verify your email first.");
};
