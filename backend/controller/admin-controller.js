import { adminService, userService, siteService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";
import { BadRequestError } from "../errors";

const adminController = {
  getUsersInfoByPagination: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const { searchKey, searchValue } = req.query;
    const [totalCount, totalPage, users] =
      await adminService.getUsersInfoByPagination(
        page,
        perPage,
        searchKey,
        searchValue
      );
    res.ok(200, { page, perPage, totalPage, totalCount, users });
  }),

  getUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserInfo(userId);
    res.ok(200, user);
  }),

  getSitesByPagination: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const { searchKey, searchValue } = req.query;
    const [totalCount, sites] = await adminService.getSitesByPagination(
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
    const site = await siteService.deleteSiteBySiteId(siteId);
    res.ok(200, site);
  }),

  editUserInfo: asyncHandler(async (req, res) => {
    if (req.body.email) {
      throw new BadRequestError("이메일은 변경할 수 없습니다.");
    }
    let profileImage = req.body.profileImage;
    const userId = req.params.userId;
    if (req.file) {
      const results = await s3Uploadv2(req.file);
      profileImage = results.Location;
    }
    const toUpdateUser = {
      ...req.body,
    };
    if (profileImage !== undefined) {
      toUpdateUser.profileImage = profileImage;
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
