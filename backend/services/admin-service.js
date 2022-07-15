import { userModel } from "../db";
import { BadRequestError } from "../errors";
import bcrypt from "bcrypt";

class AdminService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  // 삭제 예정
  // async getUsersInfoByPagenation(page, perPage) {
  //   const [totalCount, users] = await Promise.all([
  //     this.userModel.countTotalUsers(),
  //     this.userModel.pagenation(page, perPage),
  //   ]);
  //   return [totalCount, users];
  // }
  async editUserInfo(_id, toUpdate) {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    if (toUpdate.email) {
      throw new BadRequestError("이메일은 변경할 수 없습니다.");
    }
    const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
    if (toUpdate.password) {
      toUpdate = { ...toUpdate, password: hashedPassword };
    }
    const updatedUser = await this.userModel.update(_id, toUpdate);
    return updatedUser;
  }
}

const adminService = new AdminService(userModel);
export { adminService };
