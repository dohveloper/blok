import { adminService, userService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";

const adminController = {
  getUsersInfoByPagenation: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const [totalCount, users] = await adminService.getUsersInfoByPagenation(
      page,
      perPage
    );
    const totalPage = Math.ceil(totalCount / perPage);
    res.status(200).json({ users, page, perPage, totalPage });
  }),

  getUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  }),

  editUserInfo: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    let toUpdateUser = {
      ...req.body,
    };
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
    res.status(201).json(updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const deletedUser = await userService.deleteUser(userId);
    res.status(204).json(deletedUser);
  }),
};

export { adminController };
