const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;
require("dotenv").config();
require("./app/middlewares")(app);
require("./app/db")();
require("./app/config")();

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`server is running at port ${PORT}`);
});
