import passport from "passport";
import { JWT_COOKIE_KEY } from "../utils";
import { ForbiddenError } from "../errors";

function loginRequired(req, res, next) {
  const userToken = req.cookies[JWT_COOKIE_KEY];
  if (!userToken || userToken === "null") {
    throw new ForbiddenError("로그인한 유저만 사용할 수 있는 서비스입니다.");
  }
  return passport.authenticate("jwt", { session: false })(req, res, next);
}

export { loginRequired };
