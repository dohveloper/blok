import { Strategy } from "passport-jwt";
import { userModel } from "../../db";
import "dotenv/config";
import { JWT_COOKIE_KEY, userJWTObjectMaker } from "../../utils";

const cookieExtractor = (req) => {
  return req.cookies[JWT_COOKIE_KEY];
};

const opts = {
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: cookieExtractor,
};

const jwt = new Strategy(opts, async (user, done) => {
  try {
    const findUser = await userModel.findById(user.userId);
    if (findUser) {
      done(null, userJWTObjectMaker(findUser));
      return;
    }
    done(null, false);
  } catch (err) {
    done(err, false);
  }
});

export { jwt, userJWTObjectMaker };
