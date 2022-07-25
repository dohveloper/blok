import is from "@sindresorhus/is";
import { siteService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";

import { BadRequestError } from "../errors";

const siteController = {
  addsite: asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { userId, name, domain, theme, font, colorSet, blocks } = req.body;
    const newSite = await siteService.addSite({
      userId,
      name,
      domain,
      theme,
      font,
      colorSet,
      blocks,
    });
    return res.ok(200, newSite);
  }),

  getSiteInfo: asyncHandler(async (req, res) => {
    const siteId = req.params.siteId;
    const site = await siteService.getSiteInfo(siteId);
    return res.ok(200, site);
  }),

  getUserSites: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const sites = await siteService.getSites(userId);
    return res.ok(200, sites);
  }),

  getSiteInfoByDomain: asyncHandler(async (req, res) => {
    const domain = req.params.domain;
    const site = await siteService.getSiteInfoByDomain(domain);
    return res.ok(200, site);
  }),

  updateSite: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const siteId = req.params.siteId;
    const name = req.body.name;
    const domain = req.body.domain;
    const theme = req.body.theme;
    const font = req.body.font;
    const colorSet = req.body.colorSet;
    const blocks = req.body.blocks;

    const toUpdate = {
      ...(name && { name }),
      ...(domain && { domain }),
      ...(theme && { theme }),
      ...(font && { font }),
      ...(colorSet && { colorSet }),
      ...(blocks && { blocks }),
    };
    const updatedSiteInfo = await siteService.updateSite(siteId, toUpdate);
    return res.ok(200, updatedSiteInfo);
  }),
  uploadImage: asyncHandler(async (req, res) => {
    const results = await s3Uploadv2(req.file);
    const imageUrl = results.Location;
    return res.ok(200, imageUrl);
  }),

  deleteSite: asyncHandler(async (req, res) => {
    const siteId = req.params.siteId;
    const deletedSite = await siteService.deleteSiteBySiteId(siteId);
    return res.ok(200, deletedSite);
  }),
};

export { siteController };
