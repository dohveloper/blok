import is from "@sindresorhus/is";
import { userService } from "../services";
import {
  JWT_COOKIE_KEY,
  userJWTObjectMaker,
  asyncHandler,
  s3Uploadv2,
} from "../utils";
import { BadRequestError, ForbiddenError } from "../errors";

const userController = {
  register: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { userName, email, password } = req.body;
    const newUser = await userService.addUser({
      userName,
      email,
      password,
    });
    return res.ok(200, newUser);
  }),

  resetPassword: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { userName, email } = req.body;
    await userService.passwordReset(userName, email);
    return res.ok(201, { message: "비밀번호가 초기화 되었습니다!" });
    // res.status(201).json({ message: "비밀번호가 초기화 되었습니다!" });
  }),

  userDelete: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    if (req.user._id !== _id) {
      throw new ForbiddenError("본인의 계정만 삭제할 수 있습니다.");
    }
    const deletedUserInfo = await userService.deleteUser(_id);
    res.status(204).clearCookie(JWT_COOKIE_KEY).json(deletedUserInfo);
  }),
  // (jwttoken가 쿠키로 전달되기 때문에 클라이언트에선 변수 없이 호출)
  logincheck: asyncHandler((req, res) => {
    return res.status(200).json(userJWTObjectMaker(req.user));
  }),

  logout: asyncHandler(async (req, res) => {
    return res
      .status(200)
      .clearCookie("jwttoken")
      .json({ message: "로그아웃에 성공했습니다!" });
  }),

  getUserInfo: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const user = await userService.getUserInfo(_id);
    res.status(200).json(user);
  }),

  changeProfileImage: asyncHandler(async (req, res) => {
    // S3 이미지 처리 process
    const results = await s3Uploadv2(req.file);
    const profileImage = results.Location;
    // S3 이미지 저장 주소
    // await console.log(profileImage);
    // Mongo DB 저장
    if (req.user._id !== req.params._id) {
      throw new ForbiddenError("본인의 정보만 수정할 수 있습니다!");
    }
    const _id = req.user._id;
    const updatedUserInfo = await userService.changeProfileImage(_id, {
      profileImage: profileImage,
    });
    res.status(201).json(updatedUserInfo);
  }),

  changePassword: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const _id = req.params._id;
    const changePassword = req.body.password;
    const currentPassword = req.body.currentPassword;
    if (req.user._id !== _id) {
      throw new ForbiddenError("본인의 정보만 수정할 수 있습니다!");
    }

    if (!currentPassword) {
      throw new BadRequestError(
        "정보를 변경하려면, 현재의 비밀번호가 필요합니다."
      );
    }

    if (!changePassword) {
      throw new BadRequestError("변경할 비밀번호를 입력해주세요.");
    }
    const userInfoRequired = { _id, currentPassword };
    const toUpdate = {
      ...(changePassword && { password: changePassword }),
    };
    const updatedUserInfo = await userService.changeUserPassword(
      userInfoRequired,
      toUpdate
    );
    res.status(201).json(updatedUserInfo);
  }),
};

export { userController };
