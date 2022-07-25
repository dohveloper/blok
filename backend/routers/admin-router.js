import { adminController } from "../controller";
import { Router } from "express";
import { upload } from "../middlewares";

const adminRouter = Router();

adminRouter.get("/user", adminController.getUsersInfoByPagination);
adminRouter.get("/user/:userId", adminController.getUserInfo);

adminRouter.get("/site", adminController.getSitesByPagination);
adminRouter.delete("/site/:siteId", adminController.deleteSite);

adminRouter.patch(
  "/user/:userId",
  upload.single("profileImage"),
  adminController.editUserInfo
);

adminRouter.delete("/user/:userId", adminController.deleteUser);

export { adminRouter };
