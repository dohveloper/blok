import { Strategy } from "passport-jwt";
import { userModel } from "../../db";
import dotenv from "dotenv";
import { JWT_COOKIE_KEY, userJWTObjectMaker } from "../../utils";

dotenv.config();
const cookieExtractor = (req) => {
  // req 의 cookies 에서 jwttoken 사용하기
  return req.cookies[JWT_COOKIE_KEY];
};

// jwt strategy options
const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: cookieExtractor,
};

//jwt strategy
const jwt = new Strategy(opts, async (user, done) => {
  try {
    const findUser = await userModel.findById(user._id);
    if (findUser) {
      // userJWTObjectMaker => jwt화 할 유저 정보만 빼주는 함수.
      done(null, userJWTObjectMaker(findUser));
      return;
    }
    // 유저가 없으면
    done(null, false);
  } catch (err) {
    done(err, false);
  }
});

export { jwt, userJWTObjectMaker };
