import { userModel } from "../db";
import { generateRandomPassword, sendMail } from "../utils";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { BadRequestError, ForbiddenError } from "../errors";

dotenv.config();

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 회원가입
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

  // oauth 로그인 인증 부분
  // 유저를 찾고 없으면 자동 회원가입
  async findOrCreateUser(newUser) {
    const { userName, email, profileImage } = newUser;
    const user = await userModel.findByEmail(email);
    // 이메일 기반 검색으로 먼저 유저를 찾고, 없는 경우에만 진행
    // 이미 가입된 계정인 경우(oauth가 아닌) 에러 throw
    // 카카오 oauth가 이메일이 아니기 때문에 일단 이렇게 구현, 카카오 oauth가 email일 경우, 문제 있음.
    if (user && user.oauth === false) {
      throw new BadRequestError("이미 계정으로 가입된 이메일입니다.");
    }
    if (user) {
      return user;
    }
    const created = await userModel.create({
      userName,
      email,
      profileImage,
      // 비밀번호는 어쩌피 사용되지 않기 때문에 일단 고정값으로 설정
      password: "OAUTH",
      // oauth 계정은 모두 true로 설정
      oauth: true,
    });

    return created;
  }
  // 사용자 목록을 받음.
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // 사용자 정보 주는 함수
  async getUserInfo(userId) {
    const user = await this.userModel.findByShortId(userId);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    return user;
  }

  // 유저 프로필 이미지 수정
  async changeProfileImage(userId, toUpdatedIamge) {
    const user = await this.userModel.findByShortId(userId);
    if (!user) {
      throw new BadRequestError("존재하지 않는 유저입니다.");
    }
    const changedUser = await this.userModel.update(userId, toUpdatedIamge);

    return changedUser;
  }

  // 유저 비밀번호 수정, 현재 비밀번호가 있어야 수정 가능함.
  async changeUserPassword(userInfoRequired, toUpdate) {
    const { userId, currentPassword } = userInfoRequired;
    // shortId 사용
    let user = await this.userModel.findByShortId(userId);
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
    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }
    user = await this.userModel.update(userId, toUpdate);
    return user;
  }

  // 비밀번호 초기화 로직
  async passwordReset(userName, email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new BadRequestError("해당 메일로 가입된 사용자가 없습니다.");
    }
    if (user.userName !== userName) {
      throw new BadRequestError("입력하신 정보와 일치하는 사용자가 없습니다.");
    }
    if (user.oauth === true) {
      throw new ForbiddenError(
        "소셜 로그인 계정은 사용하실 수 없는 기능입니다."
      );
    }
    let password = generateRandomPassword();

    // 패스워드 발송하기
    await sendMail(
      email,
      // 제목
      "[블록] 비밀번호가 변경되었습니다.",
      // 내용
      `변경된 비밀번호는 ${password} 입니다.`
    );
    password = await bcrypt.hash(password, 10);
    const userId = user.userId;
    const updatedUser = await userModel.update(userId, {
      password,
      // 비밀번호 변경을 강제하는 로직을 위해 passwordReset을 true로 설정
      passwordReset: true,
    });
    return updatedUser;
  }

  // 회원 삭제 구현, 추후 수정예정
  async deleteUser(userId) {
    const user = await this.userModel.delete(userId);
    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
