const nodemailer = require("nodemailer");
require('dotenv').config();


const SendEmailTo = async (data)=>{
    let options = {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }
    
    let transportationConfig = nodemailer.createTransport(options);

    return await transportationConfig.sendMail(data);
        
}


module.exports = {
    SendEmailTo
};