import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
    async create(siteInfo) {
        const createdNewSite = await Site.create(siteInfo);
        return createdNewSite;
    }
    async findAll() {
        const sites = await Site.find({});
        return sites;
    }
    async findByShortId(siteId) {
        const site = await Site.findOne({ _id: siteId });
        return site;
    }
    async update(userId, update) {
        const filter = { userId };
        const option = { returnOriginal: false };
        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }
    async delete(userId) {
        const filter = { userId };
        const deletedUser = await User.findOneAndDelete(filter);
        return deletedUser;
    }
}

const siteModel = new SiteModel();

export { siteModel };
