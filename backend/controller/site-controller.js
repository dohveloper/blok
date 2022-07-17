import is from "@sindresorhus/is";
import { siteService } from "../services";
import { asyncHandler } from "../utils";

import { BadRequestError, ForbiddenError } from "../errors";

const siteController = {
  addsite: asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { userId, name, domain, theme, font, colorset, blocks } = req.body;
    const newSite = await siteService.addSite({
      userId,
      name,
      domain,
      theme,
      font,
      colorset,
      blocks,
    });
    return res.status(201).json(newSite);
  }),
  getSiteInfo: asyncHandler(async (req, res) => {
    const siteIdentifier = req.params.siteIdentifier;
    const site = await siteService.getSiteInfo(siteIdentifier);
    res.status(200).json(site);
  }),
  getSitesInfo: asyncHandler(async (req, res) => {
    const sites = await siteService.getSitesInfo();
    res.status(200).json(sites);
  }),
  getUserSites: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const sites = await siteService.getSites(userId);
    res.status(200).json(sites);
  }),
  updateSite: asyncHandler(async (req, res) => {
    const siteIdentifier = parseInt(req.params.siteIdentifier);
    const name = req.body.name;
    const domain = req.body.domain;
    const theme = req.body.theme;
    const font = req.body.font;
    const colorset = req.body.colorset;
    const blocks = req.body.blocks;

    const toUpdate = {
      ...(name && { name }),
      ...(domain && { domain }),
      ...(theme && { theme }),
      ...(font && { font }),
      ...(colorset && { colorset }),
      ...(blocks && { blocks }),
    };
    const updatedSiteInfo = await siteService.updateSite(
      siteIdentifier,
      toUpdate
    );
    res.status(200).json(updatedSiteInfo);
  }),
  deleteSiteUsingObjId: asyncHandler(async (req, res) => {
    const siteObjId = req.params.siteObjId;
    const deletedSite = await siteService.deleteSiteByObjectId(siteObjId);
    res.status(200).json(deletedSite);
  }),
};

export { siteController };