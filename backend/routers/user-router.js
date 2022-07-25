import { loginRequired, oauthBlocker, upload } from "../middlewares";
import { userController } from "../controller";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/register", userController.register);

userRouter.post("/reset-password", userController.resetPassword);

userRouter.delete("/:userId", loginRequired, userController.userDelete);

userRouter.get("/logincheck", userController.logincheck);

userRouter.get("/logout", userController.logout);

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
