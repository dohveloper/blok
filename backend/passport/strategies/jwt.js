import { Strategy } from "passport-jwt";
import { userModel } from "../../db";
import dotenv from "dotenv";

dotenv.config();
const cookieExtractor = (req) => {
  // req 의 cookies 에서 jwttoken 사용하기
  // return req.signedCookies.jwttoken
  return req.cookies.jwttoken;
};

// jwt strategy options
const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: cookieExtractor,
};

//jwt strategy
const jwt = new Strategy(opts, async (user, done) => {
  try {
    const findUser = await userModel.findByShortId(user.userId);
    // 유저가 있으면
    if (findUser) {
      done(null, {
        userId: findUser.userId,
        email: findUser.email,
        role: findUser.role,
        userName: findUser.userName,
        oauth: user.oauth,
        passwordReset: user.passwordReset,
      });
      return;
    }
    // 유저가 없으면
    done(null, false);
  } catch (err) {
    done(err, false);
  }
});

export { jwt };
