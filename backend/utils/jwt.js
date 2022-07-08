import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const setUserToken = (res, user) => {
  // 유저 jwt 토큰생성
  const jwttoken = jwt.sign(user, secret);
  // 만료시간 3일
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 3);
  // 토큰을 쿠키로 전달
  res.cookie("jwttoken", jwttoken, {
    expires: expiryDate,
    httpOnly: true,
    // signed cookie 적용 보류
    // signed: true,
  });
};

export { setUserToken };
