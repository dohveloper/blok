import User from "../db/models/user-model";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, oauthBlocker } from "../middlewares";
import { userService } from "../services";
import passport from "passport";
import { setUserToken } from "../utils";
import { Router } from "express";
import { s3Uploadv2, upload } from "../controller";

const userRouter = Router();

// 삭제 예정
userRouter.get("/", (req, res) => {
  res.send("User Router");
});

// 삭제 예정
userRouter.get("/all", async (req, res) => {
  const result = await User.find({}).exec();
  return res.json(result);
});

// 이부분 리팩토링이 필요합니다.(호연)
userRouter.post("/adduser", upload.single("file"), async (req, res) => {
  // S3 이미지 처리 process
  const profileImg = [];
  const results = await s3Uploadv2(req.file);

  profileImg.push(results.Location);
  // S3 이미지 저장 주소
  await console.log(profileImg);
  // Mongo DB 저장
  const userdata = new User({
    profileImg: profileImg,
  });
  await userdata.save();
  res.redirect("/");
});
// post '/api/register'
// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post("/register", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      userName,
      email,
      password,
    });
    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
// post '/api/login'
// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
// passport local 및 jwt 전략 사용
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  oauthBlocker,
  function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // jwt 토큰을 쿠키에 저장
      setUserToken(res, req.user);
      res.json({ message: "로그인 성공", status: 200 });
    } catch (error) {
      next(error);
    }
  }
);
// post '/api/reset-password'
// 비밀번호 초기화 api
// 테스트 아직 안해봤음.
userRouter.post("/reset-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    await userService.passwordReset(email);
    // res.redirect 필요할 것 같음. 프론트와 상의
    res.json({ message: "비밀번호가 초기화 되었습니다!", status: 200 });
  } catch (error) {
    next(error);
  }
});

// delete '/api/users/:userId'
// 회원탈퇴, 도메인 삭제는 그때가서 생각.
// 문제 생길 확률이 높음 cascade 관련해서 이후에 다시 구현 예정
userRouter.delete(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // params로부터 id를 가져옴
      const userId = req.params.userId;
      // 접근한 주소와 유저가 다를 경우, 접근 불가능
      if (req.user.userId !== userId) {
        throw new Error("본인의 계정만 삭제할 수 있습니다.");
      }
      const deletedUserInfo = await userService.deleteUser(userId);
      res.status(200).json(deletedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// get '/api/auth/google'
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
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);
// get '/api/auth/kakao'
// kakao stragegy 인증 부분
userRouter.get("/auth/kakao", passport.authenticate("kakao"));
// 카카오 로그인이 된다면 jwt 쿠키 생성
userRouter.get(
  "/auth/kauth",
  passport.authenticate("kakao", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);
// get '/api/logincheck'
// userId, email, role, userName 전달하는 함수, 이 값이 존재한다면 로그인 상태임을 확인할 수 있음.
// jwttoken을 통해(쿠키로 전달되기 때문에 클라이언트에선 변수 없이 호출)
userRouter.get("/logincheck", loginRequired, (req, res) => {
  return res.status(200).json({
    userId: req.user.userId,
    email: req.user.email,
    userName: req.user.userName,
    role: req.user.role,
    oauth: req.user.oauth,
    passwordReset: req.user.passwordReset,
  });
});
// get '/api/logout'
// logout api
userRouter.get("/logout", async function (req, res, next) {
  //쿠키에 있는 jwt 토큰이 들어 있는 쿠키를 비워줌
  try {
    res.status(200).clearCookie("jwttoken").redirect("/");
  } catch (error) {
    next(error);
  }
});

// admin api로 이동 예정
// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
// userRouter.get('/userlist', loginRequired, async function (req, res, next) {
//   try {
//     // 전체 사용자 목록을 얻음
//     const users = await userService.getUsers();
//     // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// get '/api/users/:userId'
// 유저 정보 전달 api
userRouter.get("/users/:userId", loginRequired, async function (req, res) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// patch '/api/users/"userId'
// 사용자 비밀번호 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
// shortId로 접근
userRouter.patch(
  "/users/:userId",
  loginRequired,
  oauthBlocker,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // params로부터 id를 가져옴
      const userId = req.params.userId;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const password = req.body.password;
      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // 접근한 주소와 유저가 다를 경우, 접근 불가능
      if (req.user.userId !== userId) {
        throw new Error("본인의 정보만 수정할 수 있습니다!");
      }

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }
      const userInfoRequired = { userId, currentPassword };
      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(password && { password }),
      };
      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );
      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
