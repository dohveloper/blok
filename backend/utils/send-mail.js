import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// smtp 환경변수 설정
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_SECRET,
  },
});

// 이메일을 보내주는 함수
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
