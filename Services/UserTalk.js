// userTalkPreparing.js
const nodemailer = require('nodemailer');

const userTalkPreparing = async (options) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "aayushadhikari601@gmail.com",
            pass: "sckujvoxvybzfalb"
        }
    });

    const mailSendOption = {
        from: options.email,
        to: options.toemail,
        subject: options.subject,
        text: "Hello I am " + options.username + " "+ "conect me on "+ options.text
    };

    await transporter.sendMail(mailSendOption);
};

module.exports = userTalkPreparing;
