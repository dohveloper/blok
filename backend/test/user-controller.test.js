import { userController } from "../controller";
import { BadRequestError, ForbiddenError } from "../errors";
import { userService } from "../services";
let res, next;
beforeEach(() => {
  res = {
    status: 0,
    json: {},
    cookie: false,
    ok: function (statusCode, json) {
      this.status = statusCode;
      this.json = json;
    },
    okWithDeleteCookie: function (statusCode, COOKIE_KEY) {
      this.status = statusCode;
      this.cookie = false;
    },
  };
  next = jest.fn();
});
const user = {
  name: "test",
  email: "test@email.com",
  password: "123123",
};

describe("register", () => {
  const mockAddUser = jest.spyOn(userService, "addUser");
  mockAddUser.mockResolvedValue({
    user: user,
  });
  // 작동 안함;;
  //   test("req.body가 emptyobject일 때", async () => {
  //     const req = {
  //       body: {},
  //     };
  //     expect(() => {
  //       userController.register(req, res, next);
  //     }).toThrow(BadRequestError);
  //   });

  test("req.body가 입력되었을 때, 상태코드 200, return user", async () => {
    const req = {
      body: user,
    };
    await userController.register(req, res, next);
    expect(res.status).toEqual(200);
    expect(res.json).toEqual({ user });
  });
});
describe("resetPassword", () => {
  const mockPasswordReset = jest.spyOn(userService, "passwordReset");
  mockPasswordReset.mockResolvedValue({});

  test("req.body가 입력되었을 때, 상태코드 201. 메세지 return", async () => {
    const req = {
      body: user,
    };
    await userController.resetPassword(req, res, next);
    expect(res.status).toEqual(201);
    expect(res.json).toEqual({
      message: "비밀번호가 초기화 되었습니다!",
    });
  });
});

describe("userDelete", () => {
  const userId = (Math.random() * 1000).toString();
  const req = {
    params: {
      userId,
    },
  };
  const mockDeleteUser = jest.spyOn(userService, "deleteUser");
  mockDeleteUser.mockResolvedValue({});

  test.only("req.params와 req.user의 userId가 다를때 FobiddenError", async () => {
    req.user = {
      userId: "not" + userId,
    };
    await userController.userDelete(req, res, next);
    expect(res.status).toEqual(204);
    expect(async () => {
      await userController.userDelete(req, res, next);
    }).toThrow(ForbiddenError);
  });
});
