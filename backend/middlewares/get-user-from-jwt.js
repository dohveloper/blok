import passport from "passport";
const getUserFromJWT = (req, res, next) => {
  // if (!req.signedCookies.token){
  if (!req.cookies.jwttoken) {
    next();
    return;
  }
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

export { getUserFromJWT };
