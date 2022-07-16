import { authController } from "../controller";
import { oauthBlocker } from "../middlewares";
import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  oauthBlocker,
  authController.login
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
    successRedirect: "/",
  }),
  authController.googleOauth
);

// 카카오 email을 필수로 받아올 수 없기 때문에 식별 문제로 사용 안하기로 프론트와 합의함.
// 서비스 런칭 시 email을 받아올 수 있으면 바로 사용 가능.
// get '/api/auth/kakao'
// kakao stragegy 인증 부분
// userRouter.get("/auth/kakao", passport.authenticate("kakao"));
// 카카오 로그인이 된다면 jwt 쿠키 생성
// userRouter.get(
//   "/auth/kauth",
//   passport.authenticate("kakao", { session: false }),
//   userController.kakaoOauth
// );

export { authRouter };
