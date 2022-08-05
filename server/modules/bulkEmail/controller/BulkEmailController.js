const { sendBulkEmail, xlsxToJSON, csvToJSON } = require("../../../utils");

exports.bulkEmail = async (req, res) => {
    let jsonData;

    if (req.file.mimetype === "text/csv") {
        jsonData = csvToJSON(req.file.originalname);
    } else {
        jsonData = xlsxToJSON(req.file.originalname);
    }

    const emails = jsonData.map((data) => {
        return data.email;
    });

    const message = {
        to: emails,
        from: process.env.SENDGRID_EMAIL,
        subject: "🍩 Donuts, at the big donut 🍩",
        text: "Fresh donuts are out of the oven. Get them while they’re hot!",
        html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
    };

    try {
        await sendBulkEmail(message);
        res.send("Email Sent");
    } catch (e) {
        console.log(e, "controller e");
        res.status(400).send("Something went wrong");
    }
};
