import nodemailer from "nodemailer";

const Email = process.env.USER_EMAIL;
const Password = process.env.USER_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: Email,
    pass: Password,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: Email,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
