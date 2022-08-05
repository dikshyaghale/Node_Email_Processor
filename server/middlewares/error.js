const winston = require("winston");

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);

    res.send(500).send(
        err.message || "Something Went Wrong! Contact IT Support"
    );
};
