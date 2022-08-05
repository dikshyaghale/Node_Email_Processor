const user = require("../modules/user/route/UserRoute");
const auth = require("../modules/auth/route/AuthRoute");

module.exports = function (app) {
    app.use("/api/user", user);
    app.use("/api/auth", auth);
};
