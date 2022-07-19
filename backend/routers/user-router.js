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

userRouter.delete("/:userId", loginRequired, userController.userDelete);

userRouter.get("/logincheck", userController.logincheck);

userRouter.get("/logout", loginRequired, userController.logout);

userRouter.get("/:userId", loginRequired, userController.getUserInfo);

userRouter.patch(
  "/change-profileImage/:userId",
  loginRequired,
  upload.single("profileImage"),
  userController.changeProfileImage
);

userRouter.patch(
  "/change-password/:userId",
  loginRequired,
  oauthBlocker,
  userController.changePassword
);

export { userRouter };
