import { adminService, userService, siteService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";
import { BadRequestError } from "../errors";

const adminController = {
  getUsersInfoByPagenation: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const { searchKey, searchValue } = req.query;
    const [totalCount, users] = await adminService.getUsersInfoByPagenation(
      page,
      perPage,
      searchKey,
      searchValue
    );
    const totalPage = Math.ceil(totalCount / perPage);
    res.ok(200, { page, perPage, totalPage, totalCount, users });
  }),

  getUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserInfo(userId);
    res.ok(200, user);
  }),

  getSitesByPagenation: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const { searchKey, searchValue } = req.query;
    const [totalCount, sites] = await adminService.getSitesByPagenation(
      page,
      perPage,
      searchKey,
      searchValue
    );
    const totalPage = Math.ceil(totalCount / perPage);
    res.ok(200, { page, perPage, totalPage, totalCount, sites });
  }),

  deleteSite: asyncHandler(async (req, res) => {
    const siteId = req.params.siteId;
    const site = await siteService.getSites(siteId);
    res.ok(200, site);
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
