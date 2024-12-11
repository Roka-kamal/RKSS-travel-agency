
const { EmailClient } = require("@azure/communication-email");
require("dotenv").config();

const connectionString = "endpoint=https://rksscommunicationservices.unitedstates.communication.azure.com/;accesskey=9CoTskkUxclRrYFxvMdC7SVK7tFR1G3khbJQwwV1dPWTarEwaeYOJQQJ99ALACULyCpselveAAAAAZCS5la3;";
const client = new EmailClient(connectionString);


module.exports.sendEmail = async (recipientEmail, subject, content) => {
    const emailMessage = {
        senderAddress: "DoNotReply@a0ac6c8a-9090-49c5-a15d-7f1b3a2c3efa.azurecomm.net",
        content: {
            subject: subject,
            plainText: content,
            html: `<html><body><h3>RKSS</h3><br><br>${content}</body></html>`,
        },
        recipients: {
            to: [{ address: recipientEmail }],
        },
    };

    try {
        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

