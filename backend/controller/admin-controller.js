import { adminService, userService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";
import { BadRequestError } from "../errors";

const adminController = {
  getUsersInfoByPagenation: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const { serachKey, serachValue } = req.query;
    const searchQuery = { [serachKey]: serachValue };
    const [totalCount, users] = await adminService.getUsersInfoByPagenation(
      page,
      perPage,
      searchQuery
    );
    const totalPage = Math.ceil(totalCount / perPage);
    res.ok(200, { page, perPage, totalPage, totalCount, users });
  }),

  getUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserInfo(userId);
    res.ok(200, user);
  }),

  editUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    let toUpdateUser = {
      ...req.body,
    };
    if (toUpdateUser.email) {
      throw new BadRequestError("이메일은 변경할 수 없습니다.");
    }
    if (req.file) {
      const results = await s3Uploadv2(req.file);
      const profileImage = results.Location;
      toUpdateUser = {
        ...toUpdateUser,
        profileImage,
      };
    }
    if (req.body.profileImage === "") {
      toUpdateUser = {
        ...toUpdateUser,
        profileImage: null,
      };
    }
    const updatedUser = await adminService.editUserInfo(userId, toUpdateUser);
    res.ok(201, updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    await userService.deleteUser(userId);
    res.ok(204);
  }),
};

export { adminController };
