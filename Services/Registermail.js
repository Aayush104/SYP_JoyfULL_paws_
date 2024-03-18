const nodemailer = require('nodemailer')


const sendregister = async(options) =>{
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
    subject : "User registration",
        text : "Your Registration Otp is " + options.otp,

    };

    await transporter.sendMail(mailSendOption)
};

module.exports = sendregister;