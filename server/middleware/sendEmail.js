

import nodemailer from "nodemailer"


const sendEmail = async (options) =>{


    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "00d47ea8a714e1",
          pass: "5c203045f4ec46"
        }
      });
 
    const mailOption ={
        from:"00d47ea8a714e1",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

await transporter.sendMail(mailOption)
}


export default sendEmail;



