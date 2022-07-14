import { adminController } from "../controller";
import { Router } from "express";
import { upload } from "../middlewares";

const adminRouter = Router();

adminRouter.get("/userlist", adminController.getUsersInfo);

adminRouter.patch(
  "/edit-userInfo/:_id",
  upload.single("profileImage"),
  adminController.editUserInfo
);

adminRouter.delete("/delete-user/:_id", adminController.deleteUser);

export { adminRouter };
