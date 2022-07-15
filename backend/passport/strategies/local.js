import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { userModel } from "../../db";
import { BadRequestError } from "../../errors";

const config = {
  usernameField: "email", // 'email' 필드 사용하도록 설정
  passwordField: "password", // 'password' 필드 사용하도록 설정
};

const local = new Strategy(config, async (email, password, done) => {
  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new BadRequestError("회원을 찾을 수 없습니다.");
    }
    if (user.oauth !== "local") {
      throw new BadRequestError("소셜 로그인으로 가입된 이메일입니다.");
    }
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호
    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있던 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    // 비밀번호가 일치하지 않는 경우 예외처리
    if (!isPasswordCorrect) {
      throw new BadRequestError(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    done(null, {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      oauth: user.oauth,
      passwordReset: user.passwordReset,
    });
  } catch (err) {
    done(err, null);
  }
});

export { local };
