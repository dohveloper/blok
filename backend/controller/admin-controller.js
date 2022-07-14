import { adminService, userService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";

const adminController = {
  getUsersInfo: asyncHandler(async (req, res, next) => {
    // 전체 사용자 목록을 얻음
    const users = await adminService.getUsersInfo();
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  }),

  editUserInfo: asyncHandler(async (req, res, next) => {
    const _id = req.params._id;
    const results = await s3Uploadv2(req.file);
    const profileImage = results.Location;
    const toUpdateUser = {
      ...req.body,
      profileImage: profileImage,
    };
    const updatedUser = await adminService.editUserInfo(_id, toUpdateUser);
    res.status(201).json(updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res, next) => {
    const _id = req.params._id;
    const deletedUser = await userService.deleteUser(_id);
    res.status(204).json(deletedUser);
  }),
};

export { adminController };
