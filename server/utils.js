const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const xlsx = require("xlsx");
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, from, subject, text, html) => {
    const message = {
        to,
        from,
        subject,
        text,
        html,
    };

    return sgMail.send(message, function (err, result) {
        if (err) {
            console.log("Email Not Sent");
            return false;
        } else {
            console.log("Email was Sent");
            return true;
        }
    });
};

const sendBulkEmail = (message) => {
    return sgMail.sendMultiple(message, function (err, result) {
        if (err) {
            console.log("Email Not Sent");
            return false;
        } else {
            console.log("Email was Sent");
            return true;
        }
    });
};

const csvToJSON = (filePath) => {
    const csv = fs.readFileSync(filePath);
    const lines = csv.toString().split("\n");
    const result = [];
    const headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
};

const xlsxToJSON = (filePath) => {
    const file = xlsx.readFile(filePath);
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
    let result = [];
    for (let i = 0; i < totalSheets; i++) {
        const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        tempData.shift();
        result.push(...tempData);
    }
    return result;
};

const verificationToken = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    return token;
};

exports.sendEmail = sendEmail;
exports.sendBulkEmail = sendBulkEmail;
exports.csvToJSON = csvToJSON;
exports.xlsxToJSON = xlsxToJSON;
exports.verificationToken = verificationToken;
