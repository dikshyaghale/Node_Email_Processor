const { User } = require("../modules/user/model/User");

const data = [
    {
        _id: "62ec129a8cc01b67c6284d13",
        isVerified: true,
        fullName: "Admin",
        password: "hello",
        email: "admin@gmail.com",
        phone: "9812121212",
    },
];

exports.model = User;
exports.data = data;
