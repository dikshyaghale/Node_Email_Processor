const { EmailTemplate } = require("../model/EmailTemplate");
const { sendBulkEmail, xlsxToJSON, csvToJSON } = require("../../../utils");

exports.readAll = async (req, res) => {
    const template = await EmailTemplate.find();
    res.send(template);
};

exports.readById = async (req, res) => {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return res.status(400).send("Template not found");

    res.send(template);
};

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
    console.log(emails, "emials");

    const template = await EmailTemplate.findById(req.params.id);
    if (!template)
        return res.status(400).send("Template with given Id not found.");

    const message = {
        to: emails,
        from: process.env.SENDGRID_EMAIL,
        subject: template.subject,
        text: template.text,
        html: template.body,
    };

    try {
        await sendBulkEmail(message);

        res.send("Email Sent");
    } catch (e) {
        res.status(400).send("Something went wrong");
    }
};
