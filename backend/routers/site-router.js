import { loginRequired, oauthBlocker } from "../middlewares";
import { Router } from "express";
import { siteService } from "../services";
const siteRouter = Router();

siteRouter.post("/addsite", async (req, res) => {
  const { siteName, siteDomain, siteTheme, siteFont } = req.body;
  const newSite = await siteService.addSite({
    siteName,
    siteDomain,
    siteTheme,
    siteFont,
  });
  return res.status(201).json(newSite);
});

siteRouter.get("/:siteName", async (req, res) => {
  const siteName = req.params.siteName;
  const site = await siteService.getSiteInfo(siteName);
  res.status(200).json(site);
});

siteRouter.get("/", async (req, res) => {
  const userId = req.body.userId;
  const sites = await siteService.getSites(userId);
  res.status(200).json(sites);
});

siteRouter.patch("/update/:siteName", async (req, res) => {
  const siteName = req.params.siteName;

  const editSiteName = req.body.siteName;
  // Site 이름이 존재하는지 확인하는 로직 구현 필요
  const editSiteTheme = req.body.siteTheme;
  const editSiteFont = req.body.siteFont;
  const editSiteColor = req.body.siteColor;
  const editSiteData = req.body.siteData;

  const toUpdate = {
    ...(editSiteName && { siteName: editSiteName }),
    ...(editSiteTheme && { siteTheme: editSiteTheme }),
    ...(editSiteFont && { siteFont: editSiteFont }),
    ...(editSiteColor && { siteColor: editSiteColor }),
    ...(editSiteData && { siteData: editSiteData }),
  };

  const updatedSiteInfo = await siteService.updateSite(siteName, toUpdate);

  res.status(200).json(updatedSiteInfo);
});

siteRouter.delete("/delete/:siteName", async (req, res, next) => {
  const siteName = req.params.siteName;
  const deleteSite = await siteService.deleteSite(siteName);
  res.status(200).json(deleteSite);
});
export { siteRouter };
