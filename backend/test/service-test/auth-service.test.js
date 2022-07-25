import { BadRequestError } from "../../errors";
import { authService } from "../../services";
import mongoose from "mongoose";
import "dotenv/config";

describe("userService 테스트", () => {
  let mockUser;
  function setMockUser() {
    return {
      email: "test@gmail.com",
      userName: "test",
      profileImage: "test-image",
    };
  }
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL + "test");
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  describe("findOrCreateUser", () => {
    let createdUser, loginedUser;
    const oauth = "google";
    beforeEach(async () => {
      mockUser = setMockUser();
    });
    test("findOrCreateUser는 db에 유저가 없으면 생성해주고, 있으면 그냥 로그인해준다", async () => {
      createdUser = await authService.findOrCreateUser(mockUser, oauth);
      loginedUser = await authService.findOrCreateUser(mockUser, oauth);
      expect(createdUser).toEqual(
        expect.objectContaining({ ...mockUser, oauth, password: "OAUTH" })
      );
      // findByEmail aggregate에 의해 이미 등록된 계정은 _id가 userId로 전달됨
      // createdUser는 userModel.create로 만들어졌기 때문에 _id
      expect(loginedUser.userId).toEqual(createdUser._id);
    });
  });
});
