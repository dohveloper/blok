import passport from "passport";
import { JWT_COOKIE_KEY } from "../utils";

function loginRequired(req, res, next) {
  const userToken = req.cookies[JWT_COOKIE_KEY];
  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, jwt 토큰: 없음");
    res.status(403).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });
    return;
  }
  // 비밀번호 초기화 이후 비밀번호 변경 강제 로직
  // 일단 클라이언트에서 처리하기로 회의, 불가능하다면 다시 사용
  // if (req.user.passwordReset) {
  //   throw new Error("비밀번호 초기화 이후 비밀번호 수정이 필요합니다.");
  // }
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
      next();
    }
  )(req, res, next);
}

export { loginRequired };
