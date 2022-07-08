import { userModel } from "../db";
import { generateRandomPassword, sendMail } from "../utils";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 회원가입
  async addUser(userInfo) {
    // 객체 destructuring
    const { userName, email, password } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 우선 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { userName, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 로그인 passport local 대체
  // async getUserToken(loginInfo) {
  //   // 객체 destructuring
  //   const { email, password } = loginInfo;

  //   // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
  //   const user = await this.userModel.findByEmail(email);
  //   if (!user) {
  //     throw new Error(
  //       '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
  //     );
  //   }

  //   // 이제 이메일은 문제 없는 경우이므로, 비밀번호를 확인함

  //   // 비밀번호 일치 여부 확인
  //   const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

  //   // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있떤 암호화된 비밀번호)
  //   const isPasswordCorrect = await bcrypt.compare(
  //     password,
  //     correctPasswordHash
  //   );

  //   if (!isPasswordCorrect) {
  //     throw new Error(
  //       '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
  //     );
  //   }

  //   // 로그인 성공 -> JWT 웹 토큰 생성
  //   const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

  //   // 2개 프로퍼티를 jwt 토큰에 담음
  //   const jwttoken = jwt.sign({ userId: user._id, role: user.role }, secretKey);

  //   return { jwttoken };
  // }

  // oauth 로그인 인증 부분
  // 유저를 찾고 없으면 자동 회원가입
  async findOrCreateUser(newUser) {
    const { userName, email, profileImage } = newUser;
    const user = await userModel.findByEmail(email);
    // 이메일 기반 검색으로 먼저 유저를 찾고, 없는 경우에만 진행
    // 이미 가입된 계정인 경우(oauth가 아닌) 에러 throw
    // 카카오 oauth가 이메일이 아니기 때문에 일단 이렇게 구현, 카카오 oauth가 email일 경우, 문제 있음.
    if (user && user.oauth == false) {
      throw new Error("이미 계정으로 가입된 이메일입니다.");
    }
    if (user) {
      return user;
    }
    const created = await userModel.create({
      userName,
      email,
      profileImage,
      password: "OAUTH",
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
      throw new Error("존재하지 않는 유저입니다.");
    }
    return user;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;
    // 우선 해당 id의 유저가 db에 있는지
    // shortId 사용
    let user = await this.userModel.findByShortId(userId);
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }
    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new Error(
        "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    // 이제 드디어 업데이트 시작
    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;
    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }
    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });
    return user;
  }
  // 비밀번호 초기화 로직
  // 테스트 필요함. 안해봤음.
  async passwordReset(email) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error("해당 메일로 가입된 사용자가 없습니다.");
    }
    if (user.oauth == true) {
      throw new Error("소셜 로그인 계정은 사용하실 수 없는 계정입니다.");
    }
    // 랜덤 패스워드 생성하기
    let password = generateRandomPassword();
    password = await bcrypt.hash(password, 10);
    const userId = user.userId;
    await userModel.update(
      { userId },
      {
        // hashPassword 로 업데이트 하기
        password,
        passwordReset: true,
      }
    );
    // 패스워드 발송하기
    await sendMail(
      email,
      "[블록]비밀번호가 변경되었습니다.",
      `변경된 비밀번호는 ${password} 입니다.`
    );
  }
  // 회원 삭제 구현, 추후 수정예정
  async deleteUser(userId) {
    const user = await this.userModel.delete(userId);
    return user;
  }
}

const userService = new UserService(userModel);

export { userService };
