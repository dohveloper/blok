import { del } from "express/lib/application";
import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
  // objected Id find method
  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }
  // 서비스에선 objected Id 대신 shortId 사용
  async findByShortId(userId) {
    const user = await User.findOne({ userId });
    return user;
  }
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }
  async findAll() {
    const users = await User.find({});
    return users;
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

const userModel = new UserModel();

export { userModel };
