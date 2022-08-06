const {
    EmailTemplate,
} = require("../modules/emailTemplate/model/EmailTemplate");

const data = [
    {
        _id: "62ed5d502712de9db002cdce",
        subject: "Donuts, at the big donut",
        text: "Fresh donuts are out of the oven. Get them while they’re hot!",
        body: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
    },
    {
        _id: "62ed5d502712de9db002cdcf",
        subject: "Email Template",
        text: "Hello, User!",
        body: "<h1>This email is autogenerated. Please ignore this one.</em></h1>",
    },
    {
        _id: "62ed5d502712de9db002cdd0",
        subject: "Email Template",
        text: "Hello world!",
        body: "Testing email.",
    },
];

exports.model = EmailTemplate;
exports.data = data;