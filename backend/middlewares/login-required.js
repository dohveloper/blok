import passport from "passport";

function loginRequired(req, res, next) {
  // cookie에서 token 받아옴
  // const userToken = req.signedCookies.token;
  const userToken = req.cookies.jwttoken;
  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, jwt 토큰: 없음");
    res.status(403).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }
  // 비밀번호 초기화 이후 비밀번호 변경 강제 로직
  if (req.user.passwordReset) {
    res.redirect("/change-password");
    return;
  }
  return passport.authenticate(
    "jwt",
    { session: false },
    function (err, user, info) {
      if (err || user === false) {
        return res.status(403).json({
          result: "forbidden-approach",
          reason: "정상적인 토큰이 아닙니다.",
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

export { loginRequired };
