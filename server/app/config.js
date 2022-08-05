require("dotenv").config();

module.exports = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL ERROR: JWT_SECRET is not defined");
    }
};
