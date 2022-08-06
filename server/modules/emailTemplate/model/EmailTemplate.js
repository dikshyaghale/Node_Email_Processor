const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
            maxlength: 255,
        },
        text: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

exports.EmailTemplate = EmailTemplate;
