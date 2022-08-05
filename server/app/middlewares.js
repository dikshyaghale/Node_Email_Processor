const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

module.exports = function (app) {
    app.use(express.json());

    require("./routes")(app);

    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
    app.use(compression());
};
