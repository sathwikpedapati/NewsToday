const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, 
  auth: {
    user: "pedapatisathwik@gmail.com",
    pass: "orpnpyhapkuhizso",
  },
});

async function sendMail(to,subject,text,html){
  const info = await transporter.sendMail({
    from: "pedapatisathwik@gmail.com",
    to,
    subject,
    text,
    html,
  });
}
module.exports={sendMail}