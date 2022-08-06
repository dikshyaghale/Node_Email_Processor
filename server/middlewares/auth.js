const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).send("Access denied. No token provided");

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        res.status(400).send("Invalid token");
    }
};
