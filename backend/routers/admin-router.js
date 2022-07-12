// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, adminRequired, getUserFromJWT } from "../middlewares";
import { userService } from "../services";
import { Router } from "express";

const adminRouter = Router();

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
// adminRequired를 통해 admin인지 검증.
adminRouter.get(
  "/userlist",
  loginRequired,
  getUserFromJWT,
  adminRequired,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();
      // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

export { adminRouter };
