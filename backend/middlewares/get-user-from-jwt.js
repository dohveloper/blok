import passport from "passport";

// jwt토큰이 있다면 이를 복호화하여 jwt strategie를 적용하는 미들웨어
const getUserFromJWT = (req, res, next) => {
  if (!req.cookies.jwttoken) {
    next();
    return;
  }
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

export { getUserFromJWT };
