const nodemailer = require('nodemailer')


const sendEmailPreparing = async(options) =>{
    let transporter = nodemailer.createTransport({
        service : 'gmail',

        auth :{
            user:"joyfullpaws01@gmail.com",
            pass: "qqbwubvsmtxfopzl"
        }
    })

    const mailSendOption = {
        from : "Joyfull Paws <joyfullpaws01@gmail.com>",
        to : options.email,
    subject : options.subject,
        text : "Your Otp is " + options.otp,

    };

    await transporter.sendMail(mailSendOption)
};

module.exports = sendEmailPreparing;