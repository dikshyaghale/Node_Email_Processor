const mongoose = require("mongoose");
const winston = require("winston");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = function () {
    const url = process.env.MONGO_URL;
    mongoose
        .connect(url, options)
        .then(() => winston.info("MongoDB is connected"));
};
