import mongoose from "mongoose";
import "dotenv/config";
import { userService } from "../../services";
import { BadRequestError } from "../../errors";
import bcrypt from "bcrypt";
import { userModel } from "../../db";

describe("userService 테스트", () => {
  let userId;
  let mockUser = {
    email: "test@example.com",
    userName: "test",
    password: "123123",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL + "test");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe("addUser", () => {
    let user;

    beforeAll(async () => {
      user = await userService.addUser(mockUser);
      userId = user._id;
    });

    test("addUser로 만들어진 유저는 email, userName이 같아야 한다.", async () => {
      expect(user).toEqual(
        expect.objectContaining({
          email: mockUser.email,
          userName: mockUser.userName,
        })
      );
    });

    test("addUser로 만들어진 유저는 입력된 password를 hash한 값과 매칭되어야 한다.", async () => {
      const isPasswordCorrect = await bcrypt.compare(
        mockUser.password,
        user.password
      );
      expect(isPasswordCorrect).toBeTruthy();
    });

    test("addUser로 이미 가입된 이메일을 입력으로 넣은 경우 BadRequestError throw", async () => {
      expect(async () => await userService.addUser(mockUser)).rejects.toThrow(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    });
  });

  describe("getUserInfo", () => {
    test("getUserInfo는 userId가 같은 유저를 반환해야 한다.", async () => {
      const user = await userService.getUserInfo(userId);
      expect(user).toEqual(expect.objectContaining({ userId }));
    });
  });

  describe("getUserInfo", () => {
    test("changeProfileImage는 profileImage값을 갱신해야 한다.", async () => {
      const toUpdateImage = { profileImage: "test-image" };
      const user = await userService.changeProfileImage(userId, toUpdateImage);
      expect(user.profileImage).toEqual(toUpdateImage.profileImage);
    });
  });

  describe("getUserInfo", () => {
    let user, isChangedCorrect;

    beforeAll(async () => {
      const userInfoRequired = {
        userId,
        userName: mockUser.userName,
        currentPassword: mockUser.password,
      };
      const editPassword = "1231231";
      const toUpdate = { password: editPassword };
      user = await userService.changeUserPassword(userInfoRequired, toUpdate);
      isChangedCorrect = await bcrypt.compare(editPassword, user.password);
    });

    test("changeUserPassword를 진행한 user는 passwordReset이 false여야 한다.", async () => {
      expect(user.passwordReset).toBeFalsy();
    });

    test("changeUserPassword를 통해 바꾼 password를 hash화하면 user의 password와 같아야 한다", async () => {
      expect(isChangedCorrect).toBeTruthy();
    });
  });

  describe("passwordReset", () => {
    let user, isChangedCorrect;

    beforeAll(async () => {
      user = await userService.passwordReset(mockUser.userName, mockUser.email);
      isChangedCorrect = await bcrypt.compare(mockUser.password, user.password);
    });

    test("passwordReset는 비밀번호를 변경해야 한다.", async () => {
      expect(isChangedCorrect).toBeFalsy();
    });

    test("passwordReset는 passwordReset을 true로 바꿔야 한다", async () => {
      expect(user.passwordReset).toBeTruthy();
    });
  });

  describe("passwordReset", () => {
    let checkDeleteUser;

    test("deleteUser는 유저를 DB에서 삭제해야 한다.", async () => {
      // 삭제 전 user는 undefined가 아니다.
      checkDeleteUser = await userModel.findById(userId);
      expect(checkDeleteUser).not.toBeUndefined();
      // 삭제 후 user는 undefined다.
      await userService.deleteUser(userId);
      checkDeleteUser = await userModel.findById(userId);
      expect(checkDeleteUser).toBeUndefined();
    });
  });
});
