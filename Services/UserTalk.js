// userTalkPreparing.js
const nodemailer = require('nodemailer');

const userTalkPreparing = async (options) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "joyfullpaws01@gmail.com",
            pass: "qqbwubvsmtxfopzl"
        }
    });

    const mailSendOption = {
        from: options.emailer,
        to: options.toemail,
        subject: options.subject,
        text: "Hello I am " + options.username + " "+ "conect me on "+ options.text
    };

    // console.log(mailSendOption)
    await transporter.sendMail(mailSendOption);
};

module.exports = userTalkPreparing;
