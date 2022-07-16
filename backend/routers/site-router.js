import { siteController } from "../controller";
import { Router } from "express";
const siteRouter = Router();

siteRouter.post("/addsite", siteController.addsite);

siteRouter.get("/:siteIdentifier", siteController.getSiteInfo);

siteRouter.patch("/update/:siteIdentifier", siteController.updateSite);

siteRouter.delete("/delete/:siteIdentifier", siteController.deleteSiteById);

export { siteRouter };
