import { adminService, userService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";

const adminController = {
  // 의사소통 문제로 잘못 구현. 삭제 예정
  // getUsersInfoByPagenation: asyncHandler(async (req, res) => {
  //   const page = Number(req.query.page || 1);
  //   const perPage = Number(req.query.perPage || 10);
  //   const [totalCount, users] = await adminService.getUsersInfoByPagenation(
  //     page,
  //     perPage
  //   );
  //   const totalPage = Math.ceil(totalCount / perPage);
  //   res.status(200).json({ users, page, perPage, totalPage });
  // }),
  getUserInfo: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const user = await userService.getUserInfo(_id);
    res.status(200).json(user);
  }),

  editUserInfo: asyncHandler(async (req, res) => {
    const _id = req.params._id;
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
    const updatedUser = await adminService.editUserInfo(_id, toUpdateUser);
    res.status(201).json(updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const deletedUser = await userService.deleteUser(_id);
    res.status(204).json(deletedUser);
  }),
};

export { adminController };
