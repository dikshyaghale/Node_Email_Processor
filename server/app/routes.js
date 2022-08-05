const user = require("../modules/user/route/UserRoute");
const auth = require("../modules/auth/route/AuthRoute");
const bulkEmail = require("../modules/bulkEmail/route/BulkEmailRoute");

module.exports = function (app) {
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use("/api/bulk-email", bulkEmail);
};
