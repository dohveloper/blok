import { siteController } from "../controller";
import { Router } from "express";
const siteRouter = Router();

siteRouter.post("/addsite", siteController.addsite);

siteRouter.get("/:siteIdentifier", siteController.getSiteInfo);

siteRouter.get("/", siteController.getSitesInfo);

siteRouter.get("/user/:userId", siteController.getUserSites);

siteRouter.patch("/update/:siteIdentifier", siteController.updateSite);

siteRouter.delete("/delete/:siteIdentifier", siteController.deleteSiteUsingId);

export { siteRouter };
