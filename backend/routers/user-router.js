import { loginRequired, oauthBlocker, upload } from "../middlewares";
import { userController } from "../controller";
import { Router } from "express";

const userRouter = Router();

// 삭제 예정
userRouter.get("/", (req, res) => {
  res.send("User Router");
});

userRouter.post("/register", userController.register);

userRouter.post("/reset-password", userController.resetPassword);

userRouter.delete("/:_id", loginRequired, userController.userDelete);

// _id, email, role, userName 전달하는 함수, 이 값이 존재한다면 로그인 상태임을 확인할 수 있음.
userRouter.get("/logincheck", loginRequired, userController.logincheck);

userRouter.get("/logout", loginRequired, userController.logout);

userRouter.get("/:_id", loginRequired, userController.getUserInfo);

userRouter.patch(
  "/change-profileImage/:_id",
  loginRequired,
  upload.single("profileImage"),
  userController.changeProfileImage
);

userRouter.patch(
  "/change-password/:_id",
  loginRequired,
  oauthBlocker,
  userController.changePassword
);

export { userRouter };
