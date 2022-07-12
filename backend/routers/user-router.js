import { loginRequired, oauthBlocker } from "../middlewares";
import { userController } from "../controller";
import passport from "passport";
import { Router } from "express";

const userRouter = Router();

// 삭제 예정
userRouter.get("/", (req, res) => {
  res.send("User Router");
});

// 이부분 리팩토링이 필요합니다.(호연)
// userRouter.post("/adduser", upload.single("file"), async (req, res) => {
//   // S3 이미지 처리 process
//   const profileImg = [];
//   const results = await s3Uploadv2(req.file);

//   profileImg.push(results.Location);
//   // S3 이미지 저장 주소
//   await console.log(profileImg);
//   // Mongo DB 저장
//   const userdata = new User({
//     profileImg: profileImg,
//   });
//   await userdata.save();
//   res.redirect("/");
// });

// post '/api/register'
// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post("/register", userController.register);

// post '/api/login'
// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
// passport local 및 jwt 전략 사용, oauth 계정 사용 불가.
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  oauthBlocker,
  userController.login
);

// post '/api/reset-password'
// 비밀번호 초기화 api
userRouter.post("/reset-password", userController.resetPassword);

// delete '/api/user/:userId'
// 회원탈퇴, 도메인 삭제는 그때가서 생각.
// 문제 생길 확률이 높음 cascade 관련해서 이후에 다시 구현 예정, 로그인 필요
userRouter.delete("/:userId", loginRequired, userController.userDelete);

// get '/api/user/auth/google'
// google strategy 인증 부분
// 이 url로 접근하면 구글 oauth가 진행됨
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 구글 로그인이 된다면 jwt 쿠키 생성
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  userController.googleOauth
);

// get '/api/user/auth/kakao'
// kakao stragegy 인증 부분
userRouter.get("/auth/kakao", passport.authenticate("kakao"));
// 카카오 로그인이 된다면 jwt 쿠키 생성
userRouter.get(
  "/auth/kauth",
  passport.authenticate("kakao", { session: false }),
  userController.kakaoOauth
);

// get '/api/logincheck'
// userId, email, role, userName 전달하는 함수, 이 값이 존재한다면 로그인 상태임을 확인할 수 있음.
// jwttoken을 통해(쿠키로 전달되기 때문에 클라이언트에선 변수 없이 호출)
userRouter.get("/logincheck", loginRequired, userController.logincheck);

// get '/api/logout'
// logout api
userRouter.get("/logout", loginRequired, userController.logout);

// get '/api/user/:userId'
// 유저 정보 전달 api
userRouter.get("/:userId", loginRequired, userController.getUserInfo);

// patch '/api/user/"userId'
// 사용자 비밀번호 수정
// shortId로 접근, oauth 계정 사용 불가, login 필수.
userRouter.patch(
  "/:userId",
  loginRequired,
  oauthBlocker,
  userController.editPassword
);

export { userRouter };
