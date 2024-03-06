const nodemailer = require('nodemailer')


const sendEmailPreparing = async(options) =>{
    let transporter = nodemailer.createTransport({
        service : 'gmail',

        auth :{
            user:"aayushadhikari601@gmail.com",
            pass: "wsggmoqcqyzxbsep"
        }
    })

    const mailSendOption = {
        from : "Aayush Adhikari <aayushadhikari601@gmail.com>",
        to : options.email,
    subject : options.subject,
        text : "Your Otp is" + options.otp,

    };

    await transporter.sendMail(mailSendOption)
};

module.exports = sendEmailPreparing;