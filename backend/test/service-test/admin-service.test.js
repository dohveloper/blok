import mongoose from "mongoose";
import { adminService } from "../../services";
import { BadRequestError } from "../../errors";
import { userModel, siteModel } from "../../db";

describe("userService 테스트", () => {
  beforeAll(async () => {
    // 삽입 삭제 없기때문에 기존 db 사용 오피스아워때 질문
    await mongoose.connect(process.env.MONGODB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("getUsersInfoByPagination", () => {
    beforeAll(() => {});

    test("searchKey, searchValue가 없어도 데이터를 반환한다.", async () => {
      const [totalCount, totalPagge, users] =
        await adminService.getUsersInfoByPagination(1, 10);
      expect(users).not.toBe(undefined);
    });

    test("searchKey, searchValue가 없어도 데이터를 반환한다.", async () => {
      const [totalCount, totalPagge, users] =
        await adminService.getUsersInfoByPagination(1, 10);
      expect(users).not.toBe(undefined);
    });
  });
});
