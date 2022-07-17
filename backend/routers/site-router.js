import { siteController } from "../controller";
import { Router } from "express";
const siteRouter = Router();

siteRouter.post("/", siteController.addsite);

siteRouter.get("/:siteId", siteController.getSiteInfo);

siteRouter.get("/sites", siteController.getSitesInfo);

siteRouter.get("/user/:userId", siteController.getUserSites);

siteRouter.patch("/:siteId", siteController.updateSite);

siteRouter.delete("/:siteId", siteController.deleteSiteUsingObjId);

export { siteRouter };
