import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import { userModel } from "../../db";
import { BadRequestError } from "../../errors";
import { userJWTObjectMaker } from "../../utils";
import { AUTH_ENUM } from "../";

const config = {
  usernameField: "email",
  passwordField: "password",
};

const local = new Strategy(config, async (email, password, done) => {
  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new BadRequestError("회원을 찾을 수 없습니다.");
    }
    if (user.oauth !== AUTH_ENUM.LOCAL) {
      throw new BadRequestError("소셜 로그인으로 가입된 이메일입니다.");
    }
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new BadRequestError(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    done(null, userJWTObjectMaker(user));
  } catch (err) {
    done(err, null);
  }
});

export { local };
