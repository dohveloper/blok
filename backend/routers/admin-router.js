import { adminController } from "../controller";
import { Router } from "express";
import { upload } from "../middlewares";

const adminRouter = Router();

adminRouter.get("/user/:_id", adminController.getUserInfo);

adminRouter.patch(
  "/user/:_id",
  upload.single("profileImage"),
  adminController.editUserInfo
);

adminRouter.delete("/user/:_id", adminController.deleteUser);

export { adminRouter };
