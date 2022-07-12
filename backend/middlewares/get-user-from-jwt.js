import passport from "passport";
import { JWT_COOKIE_KEY } from "../utils";
// jwt토큰이 있다면 이를 복호화하여 jwt strategie를 적용하는 미들웨어
// req.user가 필요한 경우에 사용.
const getUserFromJWT = (req, res, next) => {
  if (!req.cookies[JWT_COOKIE_KEY]) {
    next();
    return;
  }
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

export { getUserFromJWT };
