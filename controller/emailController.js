import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

const sendEmail = asyncHandler( async (data, req, res) => {
    
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "chathuramadhava54@gmail.com",
      pass: "iqwwaehjtbuyszcy",
    },
  });
  
    const info = await transporter.sendMail({
      from: 'chathuramadhava54@gmail.com', // sender address
      to: data.to/* "chathuratechdev@gmail.com" */, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);  
});

export default sendEmail;