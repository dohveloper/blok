import is from "@sindresorhus/is";
import { setUserToken, asyncHandler } from "../utils";
import { BadRequestError } from "../errors";

const authController = {
  login: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    setUserToken(res, req.user);
    res.status(200).json({
      message: "로그인 성공",
      status: 200,
      passwordReset: req.user.passwordReset,
    });
  }),
  googleOauth: asyncHandler((req, res) => {
    setUserToken(res, req.user);
    res.status(201).json(req.user);
  }),

  kakaoOauth: asyncHandler((req, res) => {
    setUserToken(res, req.user);
    res.status(201).json(req.user);
  }),
};

export { authController };
