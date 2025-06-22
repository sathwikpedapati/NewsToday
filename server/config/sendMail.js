const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, 
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});

async function sendMail(to,subject,text,html){
  const info = await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
}
module.exports={sendMail}
