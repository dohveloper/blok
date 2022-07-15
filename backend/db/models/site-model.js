import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
  async create(siteInfo) {
    const createdNewSite = await Site.create(siteInfo);
    return createdNewSite;
  }
  async findBySiteName(siteId) {
    const site = await Site.findOne({ siteName: siteId });
    return site;
  }
  async findAllUserSites(userId) {
    const sites = await Site.find({ siteDomain: userId })
      .populate("siteDomain", "domain userName")
      .exec();
    return sites;
  }
  async update({ siteName, update }) {
    const filter = { siteName: siteName };
    const option = { returnOriginal: false };
    const updatedSite = await Site.findOneAndUpdate(filter, update, option);

    return updatedSite;
  }
  async delete(siteId) {
    const filter = { siteName: siteId };
    const deletedSite = await Site.findOneAndDelete(filter);
    return deletedSite;
  }
}

const siteModel = new SiteModel();

export { siteModel };
