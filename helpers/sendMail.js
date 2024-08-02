const nodemailer = require('nodemailer');

module.exports=(email,sub,text)=>{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

const mailOptions = {
  from:  process.env.EMAIL,
  to: email,
  subject: sub,
  html: text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}