import is from "@sindresorhus/is";
import { userService } from "../services";
import { JWT_COOKIE_KEY, asyncHandler, s3Uploadv2 } from "../utils";
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
  }),

  userDelete: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (req.user.userId !== userId) {
      throw new ForbiddenError("본인의 계정만 삭제할 수 있습니다.");
    }
    const deletedUserInfo = await userService.deleteUser(userId);
    res.status(204).clearCookie(JWT_COOKIE_KEY).json(deletedUserInfo);
  }),
  // (jwttoken가 쿠키로 전달되기 때문에 클라이언트에선 변수 없이 호출)
  logincheck: (req, res) => {
    return res.ok(200, req.user);
  },

  logout: (req, res) => {
    return res.okWithDeleteCookie(200, JWT_COOKIE_KEY, {
      message: "로그아웃에 성공했습니다!",
    });
  },

  getUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (userId !== req.user.userId) {
      throw new ForbiddenError("본인의 정보만 조회할 수 있습니다!");
    }
    const user = await userService.getUserInfo(userId);
    res.ok(200, user);
  }),

  changeProfileImage: asyncHandler(async (req, res) => {
    if (req.user.userId !== req.params.userId) {
      throw new ForbiddenError("본인의 정보만 수정할 수 있습니다!");
    }
    const results = await s3Uploadv2(req.file);
    const profileImage = results.Location;
    const userId = req.user.userId;
    const updatedUserInfo = await userService.changeProfileImage(userId, {
      profileImage: profileImage,
    });
    res.ok(201, updatedUserInfo);
  }),

  changePassword: asyncHandler(async (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const userId = req.params.userId;
    const { currentPassword, toEditPassword } = req.body;
    if (req.user.userId !== userId) {
      throw new ForbiddenError("본인의 정보만 수정할 수 있습니다!");
    }
    if (!currentPassword) {
      throw new BadRequestError(
        "정보를 변경하려면, 현재의 비밀번호가 필요합니다."
      );
    }
    const userInfoRequired = { userId, currentPassword };
    const toUpdate = { password: toEditPassword };
    const updatedUserInfo = await userService.changeUserPassword(
      userInfoRequired,
      toUpdate
    );
    res.ok(201, updatedUserInfo);
  }),
};

export { userController };
