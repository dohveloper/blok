import mongoose, { model } from "mongoose";
import { userModel } from "./user-model";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
  async create(siteInfo) {
    const userId = siteInfo.userId;
    const createdNewSite = await Site.create(siteInfo);
    const siteId = JSON.stringify(createdNewSite._id).replace(/["]/g, "");
    const user = await userModel.createSiteById(userId, siteId);

    return createdNewSite;
  }

  // async findBySiteId(siteId) {
  //   const site = await Site.findOne({ _id: siteId });
  //   return site;
  // }
  // async findBySiteDomain(siteDomain) {
  //   const site = await Site.findOne({ domain: siteDomain });
  //   return site;
  // }
  async findBySiteId(siteId) {
    const site = await Site.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(siteId),
        },
      },
      {
        $addFields: {
          siteId: "$_id",
        },
      },
      { $project: { _id: 0 } },
    ]);
    return site[0];
  }

  async findAllSite() {
    const sites = await Site.find({}).populate("userId");
    return sites;
  }

  async findAllUserSites(userId) {
    const sites = await Site.find({ userId: userId });
    return sites;
  }

  async update({ id, update }) {
    const filter = { _id: id };
    const option = { returnOriginal: false };
    const updatedSite = await Site.findOneAndUpdate(filter, update, option);
    return updatedSite;
  }

  async deleteById(id) {
    const filter = { _id: id };
    const deletedSite = await Site.findOneAndDelete(filter);
    return deletedSite;
  }

  async countTotalSites(searchKey, searchValue) {
    const totalCount = await Site.countDocuments({
      [searchKey]: { $regex: searchValue, $options: "i" },
    });
    return totalCount;
  }

  async pagenation(page, perPage, searchKey, searchValue) {
    const sites = await Site.aggregate([
      {
        $match: {
          [searchKey]: { $regex: searchValue, $options: "i" },
        },
      },
      {
        $addFields: {
          siteId: "$_id",
        },
      },
      { $project: { _id: 0 } },
    ])
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return sites;
  }

  async deleteSiteBySiteId(siteId) {
    const filter = { _id: siteId };
    const site = await Site.find({ _id: siteId });
    const userId = JSON.stringify(site[0].userId._id).replace(/["]/g, "");
    const user = await userModel.deleteSiteById(userId, siteId);
    const deletedSite = await Site.findOneAndDelete(filter);
    return deletedSite;
    // //solve 1:
    // const site = await Site.find({ _id: id });
    // const userId = JSON.stringify(site[0].owner).replace(/["]/g, "");
    // const user = await userModel.findById(userId);
  }
}

const siteModel = new SiteModel();

export { siteModel };
