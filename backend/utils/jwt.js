import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET_KEY;
const JWT_COOKIE_KEY = "jwttoken";

const setUserToken = (res, user) => {
  const jwttoken = jwt.sign(user, secret);
  // 만료시간 3일
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 3);
  res.cookie(JWT_COOKIE_KEY, jwttoken, {
    expires: expiryDate,
    httpOnly: true,
  });
};

export { setUserToken, JWT_COOKIE_KEY };
