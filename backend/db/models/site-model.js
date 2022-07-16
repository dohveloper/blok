import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
  async create(siteInfo) {
    const createdNewSite = await Site.create(siteInfo);
    return createdNewSite;
  }
  async findBySiteName(siteName) {
    const site = await Site.findOne({ name: siteName });
    return site;
  }
  async findBySiteDomain(siteDomain) {
    const site = await Site.findOne({ domain: siteDomain });
    return site;
  }
  async findBySiteId(siteId) {
    const site = await Site.findOne({ no: siteId });
    return site;
  }
  async findAllSite() {
    const sites = await Site.find({});
    return sites;
  }
  // async findAllUserSites(userId) {
  //   const sites = await Site.find({ domain: userId })
  //     .populate("domain", "domain userName")
  //     .exec();
  //   return sites;
  // }
  async update({ id, update }) {
    const filter = { no: id };
    const option = { returnOriginal: false };
    const updatedSite = await Site.findOneAndUpdate(filter, update, option);
    console.log(filter, update, updatedSite);

    return updatedSite;
  }
  async deleteById(id) {
    const filter = { no: id };
    const deletedSite = await Site.findOneAndDelete(filter);
    return deletedSite;
  }
  async deleteByObjectId(id) {
    const filter = { _id: id };
    const deletedSite = await Site.findOneAndDelete(filter);
    return deletedSite;
  }
}

const siteModel = new SiteModel();

export { siteModel };
