import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_SECRET,
  },
});

const sendMail = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      to,
      subject,
      text,
    };
    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });

export { sendMail };
