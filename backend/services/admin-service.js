import { userModel, siteModel } from "../db";
import { BadRequestError } from "../errors";
import bcrypt from "bcrypt";

class AdminService {
  constructor(userModel, siteModel) {
    this.userModel = userModel;
    this.siteModel = siteModel;
  }
  async getUsersInfoByPagination(page, perPage, searchKey, searchValue) {
    const [totalCount, users] = await Promise.all([
      this.userModel.countTotalUsers(searchKey, searchValue),
      this.userModel.pagination(page, perPage, searchKey, searchValue),
    ]);
    const totalPage = Math.ceil(totalCount / perPage);
    return [totalCount, totalPage, users];
  }

  async getSitesByPagination(page, perPage, searchKey, searchValue) {
    const [totalCount, sites] = await Promise.all([
      siteModel.countTotalSites(searchKey, searchValue),
      siteModel.pagination(page, perPage, searchKey, searchValue),
    ]);
    return [totalCount, sites];
  }

  async editUserInfo(userId, toUpdate) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
    if (toUpdate.password) {
      toUpdate = { ...toUpdate, password: hashedPassword };
    }
    return await this.userModel.update(userId, toUpdate);
  }
}

const adminService = new AdminService(userModel, siteModel);
export { adminService };
