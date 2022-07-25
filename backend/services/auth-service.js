import { BadRequestError } from "../errors";
import { userModel } from "../db";

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  async findOrCreateUser(newUser, oauth) {
    const { userName, email, profileImage } = newUser;
    const user = await userModel.findByEmail(email);
    // 이미 가입된 이메일 + 해당 oauth가 아닌 경우, 에러 throw
    if (user && user.oauth !== oauth) {
      throw new BadRequestError("이미 계정으로 가입된 이메일입니다.");
    }
    console.log(user);

    if (user) {
      return user;
    }
    await userModel.create({
      userName,
      email,
      profileImage,
      // 비밀번호는 사용되지 않기 때문에 고정값으로 설정
      password: "OAUTH",
      oauth: oauth,
    });
    return await userModel.findByEmail(email);
  }
}

const authService = new AuthService(userModel);

export { authService };
