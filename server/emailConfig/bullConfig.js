const Queue = require("bull");

const { sendEmail } = require("../utils");

const { setQueues, BullAdapter } = require("bull-board");

const emailQueue = new Queue("email", { redis: process.env.REDIS_URL });
console.log(emailQueue, "email queue");

// setQueues([BullAdapter(emailQueue)]);

emailQueue.process(sendEmail);

const sendNewEmail = (data) => {
    emailQueue.add(data, {
        attempts: 5,
    });
};

exports.sendNewEmail = sendNewEmail;

// export const sendMailQueue;
