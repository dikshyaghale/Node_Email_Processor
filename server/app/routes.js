const user = require("../modules/user/route/UserRoute");
const auth = require("../modules/auth/route/AuthRoute");
const emailTemplate = require("../modules/emailTemplate/route/EmailTemplateRoute");

module.exports = function (app) {
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use("/api/email-template", emailTemplate);
};
