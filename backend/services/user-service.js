import { generateRandomPassword, sendMail } from "../utils";
import bcrypt from "bcrypt";
import { BadRequestError, ForbiddenError } from "../errors";
import { userModel } from "../db";

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(userInfo) {
    const { userName, email, password } = userInfo;
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new BadRequestError(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserInfo = { userName, email, password: hashedPassword };
    const createdNewUser = await this.userModel.create(newUserInfo);
    return createdNewUser;
  }

  async getUserInfo(_id) {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    return user;
  }

  async changeProfileImage(_id, toUpdatedIamge) {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    const changedUser = await this.userModel.update(_id, toUpdatedIamge);

    return changedUser;
  }

  async changeUserPassword(userInfoRequired, toUpdate) {
    const { _id, currentPassword } = userInfoRequired;
    let user = await this.userModel.findById(_id);
    if (!user) {
      throw new BadRequestError(
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new BadRequestError(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    const { password } = toUpdate;
    const newPasswordHash = await bcrypt.hash(password, 10);
    toUpdate.password = newPasswordHash;
    toUpdate.passwordReset = false;
    user = await this.userModel.update(_id, toUpdate);
    return user;
  }

  async passwordReset(userName, email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new BadRequestError("해당 메일로 가입된 사용자가 없습니다.");
    }
    if (user.userName !== userName) {
      throw new BadRequestError("입력하신 정보와 일치하는 사용자가 없습니다.");
    }
    if (user.oauth !== "local") {
      throw new ForbiddenError(
        "소셜 로그인 계정은 사용하실 수 없는 기능입니다."
      );
    }
    let password = generateRandomPassword();

    await sendMail(
      email,
      // 제목
      "[블록] 비밀번호가 변경되었습니다.",
      // 내용
      `변경된 비밀번호는 ${password} 입니다.`
    );
    password = await bcrypt.hash(password, 10);
    const _id = user._id;
    const updatedUser = await userModel.update(_id, {
      password,
      // 비밀번호 변경을 강제하는 로직을 위해 passwordReset을 true로 설정
      passwordReset: true,
    });
    return updatedUser;
  }

  // 회원 삭제 구현, 추후 수정예정
  async deleteUser(_id) {
    const user = await this.userModel.delete(_id);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다!");
    }
    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
