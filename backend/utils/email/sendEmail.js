const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    try {
        //Create a transporter object using default SMTP transport
       const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
       });

       //Create source path: utils/email/...
       const source = fs.readFileSync(path.join(__dirname, template), "utf8");
       //Compile email template into a function
       const compiledTemplate = handlebars.compile(source);
       //Create email options
       const options = () => {
        return {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        };
       };
       console.log(process.env.FROM_EMAIL)
       console.log(email)
       console.log(subject)

       //Attempt to send email
       await transporter.sendMail(options(), function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
       });
       //Return if successful
       return { success: true };
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;