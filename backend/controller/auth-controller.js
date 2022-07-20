import is from "@sindresorhus/is";
import { BadRequestError } from "../errors";

const authController = {
  login: (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "입력값이 비어있습니다! 다시 한번 확인해주세요."
      );
    }
    res.okWithSetToken(200, {
      message: "로그인 성공",
      passwordReset: req.user.passwordReset,
    });
  },
  googleOauth: (req, res) => {
    res.okWithSetToken(201);
  },
};

export { authController };
